import config from "../config";

export async function getOneWay(data){

        const url = `${config.DB_URL}/oneWay`
        const res = await fetch(url, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)});
        if(res.ok){
            //console.log(res.json())
          return res.json();
        } else{
        throw new Error("Invalid Request");
      }
}

export async function getRoundTrip(data){
        const url = `${config.DB_URL}/roundTrip`
        const res = await fetch(url, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)});
        if(res.ok){
          return res.json();
        }else{
        throw new Error("Invalid Request");
      }
}

export async function index() {
    const res = await fetch('http://localhost:4000/getAccessToken', { method: "POST" });
    if (res.ok) {
        console.log('api client', res)
      return res.json();
    } else {
      throw new Error("Invalid Request");
    }
  }

  export async function destroy(id){
    try{
      const url = `${config.DB_URL}/${id}`;
      const res = await fetch(url, {method: "DELETE"});
      if(res.ok){
        return res.json();
      }
    }catch(err){
      throw new Error("Invalid Request")
    }
  }

export async function lookUpFlight(){
    const url = 'https://siddiq-such-flight-v1.p.rapidapi.com/search?to=LHE&from=DXB&depart-date=2023-12-31&return-date=2024-01-07';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'a984cd05aamsh9bf1628c3abe4bfp189dcfjsne3b07ed594ba',
    'X-RapidAPI-Host': 'siddiq-such-flight-v1.p.rapidapi.com'
  }
};
      try {
        const response = await fetch(url, options);
        console.log(response)
        //const result = await response.json();
        // console.log('api ',result);
        // return result
        return response
    } catch (error) {
        console.error(error);
    } 
}
