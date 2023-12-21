const express = require("express");
const router = express.Router();
const { AMADEUS_API_KEY, AMADEUS_API_SECRET } = process.env;

const amadeusCtrl = require("../controllers/amadeus");

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
      return res.json();
    })
    .then((json) => {
      req.token = json.access_token;
      next();
    });
};

router.post("/oneWay", getToken, amadeusCtrl.getOneWayTrip);

router.post("/roundTrip", getToken, amadeusCtrl.getRoudTrip);

router.post("/pricing", getToken, amadeusCtrl.getPricing);

module.exports = router;
