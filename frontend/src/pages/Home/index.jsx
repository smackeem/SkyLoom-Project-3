import { useState, useEffect } from "react";

const Home = () => {
    const [bookingDetails, setBookingDetails] = useState({
        to: "",
        from: "",
        depart_date: "",
        arrival_date: ""
    });

    const handleRequest = () =>{
        console.log("testing")
    }

    useEffect(()=>{
        handleRequest()
    }, []);

    return (
        <div>
            <h1>Home</h1>
            
        </div>
    )
}

export default Home;