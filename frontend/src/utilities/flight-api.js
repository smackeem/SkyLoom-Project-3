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

export async function getPricingData(data){
    const url = `${config.DB_URL}/pricing`
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

