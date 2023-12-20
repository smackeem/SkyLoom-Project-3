const express = require("express");
const router = express.Router();
const { AMADEUS_API_KEY, AMADEUS_API_SECRET } = process.env;

const getToken = (req, res, next) => {
  const uriAuth = "https://test.api.amadeus.com/v1/security/oauth2/token";
  let headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  let body = {
    grant_type: "client_credentials",
    client_id: AMADEUS_API_KEY,
    client_secret: AMADEUS_API_SECRET,
  };
  
  fetch(uriAuth, {
    method: "POST",
    headers: headers,
    body:
      "grant_type=client_credentials&client_id=" +
      body.client_id +
      "&client_secret=" +
      body.client_secret,
  })
    .then((res) => {
      return  res.json();
    })
    .then((json) => {
      req.token = json.access_token;
      next()
    });
};

router.post("/oneWay", getToken, async (req, res, next)=>{
    try{
        console.log(req.token)
        const {originLocationCode, destinationLocationCode, departureDate, adults, max} = req.body
        console.log(req.body)
        const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&adults=${adults}&max=${max}`
        const response = await fetch(url, {
            method: "GET",
            headers: {'Authorization': `Bearer ${req.token}`,
            'Content-Type': 'application/json'},
            })
        if(response.ok){
            return res.status(200).json(await response.json());
        } else {
            const errorBody = await response.text();
            console.error('Error Response:', errorBody);
            return res.status(response.status).json({ error: 'Failed to fetch flight offers.' });
        }
      }catch(err){
        res.status(400).json({err: err.message});
      }
})

router.post("/roundTrip", getToken, async (req, res, next)=>{
    try{
        //console.log(token)
        const {originLocationCode, destinationLocationCode, departureDate, returnDate, adults, max} = req.body
        const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${originLocationCode}&destinationLocationCode=${destinationLocationCode}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${adults}&nonStop=false&max=${max}`
        const response = await fetch(url, {
            method: "GET",
            headers: {'Authorization': `Bearer ${req.token}`,
            'Content-Type': 'application/json'},
            })
        if(response.ok){
            return res.status(200).json(await response.json());
        } else {
            const errorBody = await response.text();
            console.error('Error Response:', errorBody);
            return res.status(response.status).json({ error: 'Failed to fetch flight offers.' });
        }
      }catch(err){
        res.status(400).json({err: err.message});
      }
})

module.exports = router;
