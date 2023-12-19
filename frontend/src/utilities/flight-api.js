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