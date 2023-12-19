import config from "../config";

export async function createDB(data){
    try{
        const res = await fetch(config.DB_URL, {
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)});
        if(res.ok){
          return res.json();
        } 
      }catch(err){
        throw new Error("Invalid Request");
      }
}

export async function index() {
    const res = await fetch(config.DB_URL, { method: "GET" });
    if (res.ok) {
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
