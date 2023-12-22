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
export async function createDB(data, token){
        const res = await fetch(`${config.DB_URL}/flights`, {
          method: "POST",
          headers: {'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`},
          body: JSON.stringify(data)});
        if(res.ok){
          return res.json();
        }else{
        throw new Error("Invalid Request");
      }
}

  export async function destroy(id, token){
      const url = `${config.DB_URL}/flights/${id}`;
      const res = await fetch(url, {method: "DELETE",
      headers: {'Authorization': `Bearer ${token}`}});
      if(res.ok){
        return res.json();
      }else{
      throw new Error("Invalid Request")
    }
  }

  export async function saved(email, token){
    const url = `${config.DB_URL}/flights/saved`;
    const res = await fetch(url, {
        method: "GET",
        headers: {'Authorization': `Bearer ${token}`,
        'User': email}});
    if(res.ok){
      return res.json();
    }else{
    throw new Error("Invalid Request")
  }
}

export async function details(id, token){
  const url = `${config.DB_URL}/flights/${id}`;
  const res = await fetch(url, {method: "GET",
  headers: {'Authorization': `Bearer ${token}`}});
  if(res.ok){
    return res.json();
  }else{
  throw new Error("Invalid Request")
}
}