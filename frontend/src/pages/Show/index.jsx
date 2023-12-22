/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { getDetails } from "../../utilities/flight-service";
import { Link } from "react-router-dom";
const Show = () => {
    const [flight, setFlight] = useState(null)
    const {id} = useParams();
    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem('token'))

    const handleRequest = async() =>{
        try{
            const data = await getDetails(id, token)
            console.log(data)
            setFlight(data);
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        handleRequest()
    },[])
 
    return (
        <h1>Show</h1>
    )
}

export default Show