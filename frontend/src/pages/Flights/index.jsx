import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { addToDB } from "../../utilities/flight-service";
import FlightItem from "./FlightItem";
import {RotatingLines} from "react-loader-spinner";


const Flights = ({ allFlights, status, tripStat }) => {
    const [savedFlights, setSavedFlights] = useState([]);
    const { isAuthenticated, user, getAccessTokenSilently, loginWithPopup } = useAuth0()
    const [token, setToken] = useState()

    useEffect(() => {
        const getUserToken = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                setToken(accessToken);
            } catch (e) {
                console.log(e.message);
            }
        };

        isAuthenticated && getUserToken();
    }, [user?.sub]);

    const handleSaveTrip = async (flight) => {
        if (!isAuthenticated) {
            loginWithPopup();
            return;
        }
        console.log(flight)
        if (notSaved(flight)) {
            setSavedFlights([...savedFlights, flight]);
            const data = { ...flight, user: user }
            const flightData = await addToDB(data, token)
            console.log('flight',flightData)
        }else{
            console.log('already addded');
        }
    };

    // function connectingOrNonstop(data){
    //     (tripStat && data.segments > 2) ? true : false
   
    //     (!tripStat && data.segment > 1){
    //         return true
    //     }
    // }

    function notSaved(data){
        return !savedFlights.includes(data)
    }

    const loaded = () => {
        return(
            <div className="d-flex mt-3 flex-column ">
            {allFlights?.map((flight, idx) => (
               <FlightItem key={idx} flight={flight} handleSaveTrip={handleSaveTrip} notSaved={notSaved} />
            ))}
        </div>
        )
    }
    return (
        <>
        {status ?  <div className="d-flex mt-3"><RotatingLines visible={true} height="96" width="96" color="grey" ariaLabel="rotating-lines-loading" wrapperStyle={{}} wrapperClass=""/></div> : loaded()
     }
        </>
        
    )
}

export default Flights