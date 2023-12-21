import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import { getSaved, removeSaved, convertHM } from '../../utilities/flight-service';
import Swal from 'sweetalert2';

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
          Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
          }).then(async (result) => {
            if (result.isConfirmed) {
              const removedFlight = await removeSaved(id, token)
          console.log(removedFlight)
          getUserToken()
              Swal.fire('Deleted!', 'Flight deleted!', 'success');
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire('Cancelled', 'Flight is save!', 'info');
            }
          });
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
                <div className='d-flex'>

                
                {flight.segments.map((segment, sIdx) => (
                    <div key={sIdx} className="d-flex card-group m-2 align-items-start rounded border ">
                        <section className="card">
                        <p>{new Date(segment.departureDateTime).toLocaleString()}</p>
                        <p>Duration: {convertHM(segment.duration)}</p>
                        <p className="text-muted">{segment.isNonStop ? 'Non-Stop' : 'Connecting'}</p>
                        <p>{segment.originLocation.cityCode} - {segment.destinationLocation.cityCode}</p>
                        </section>
                        </div>
                ))}
                </div>
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