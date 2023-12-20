import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { getSaved, removeSaved } from '../../utilities/flight-service';

const SavedFlights = () => {
  const { isLoading: loadingAuth, isAuthenticated, user, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState()
  const [savedFlights, setSavedFlights] = useState([]);
  const [airlines, setAirlines] = useState([])

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  const getUserToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      const flightData = await getSaved(user?.email, accessToken);
      setSavedFlights(flightData);
      const airlineData = await fetch('/airlines.json');
      const airlineList = await airlineData.json()
      setAirlines(airlineList)
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    isAuthenticated && getUserToken(); 
  }, [user?.sub]);


  if (loadingAuth) {
    return <div>Loading ...</div>;
  }

    const handleDelete = async(id) => {
        try{
          const removedFlight = await removeSaved(id, token)
          console.log(removedFlight)
          getUserToken()
        }catch(err){
          console.log(err.message)
        }
    }
  
    const loaded = () =>{
      return(
        <div className="d-flex m-3 flex-column">
          {savedFlights && savedFlights.length > 0 ? (
        savedFlights?.map((flight, idx) => (
            <div key={idx} className="d-flex p-5 m-2 align-items-start flex-column rounded border ">
            <button onClick={() => handleDelete(flight._id)} className="btn btn-danger">Delete Trip</button>

                <p>Price: {flight.price}</p>
                <p> {airlines[flight.validatingAirlineCodes.join(', ')]}</p>
                {flight.segments.map((segment, sIdx) => (
                    <div key={sIdx} className="d-flex card-group m-2 align-items-start rounded border ">
                        <section className="card">
                        <p>{new Date(segment.departureDateTime).toLocaleString()}</p>
                        <p>Duration: {segment.duration}</p>
                        <p className="text-muted">{segment.isNonStop ? 'Non-Stop' : 'Connecting'}</p>
                        <p>{segment.originLocation.cityCode} - {segment.destinationLocation.cityCode}</p>
                        </section>
                        </div>
                ))}

            </div>
        ))
          ) : (
            <h2>No Saved Flights Yet</h2>
          )
    }
    </div>
      )
    }

  return (
    <div>
      {savedFlights && airlines && token ? loaded() : 'Loading...'}
    </div>
  );
}

export default SavedFlights;
