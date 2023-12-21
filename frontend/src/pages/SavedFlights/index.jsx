import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";
import {RotatingLines} from "react-loader-spinner";
import { getSaved, removeSaved, convertHM, convertIATACode } from '../../utilities/flight-service';
import Swal from 'sweetalert2';

const SavedFlights = () => {
  const { isLoading: loadingAuth, isAuthenticated, user, getAccessTokenSilently } = useAuth0()
  const [token, setToken] = useState()
  const [isLoading, setIsloading] = useState(true)
  const [savedFlights, setSavedFlights] = useState([]);
  const [airline, setAirline] = useState([])

  const fetchData = async () => {
      const response = await fetch('/airlines.json');
      const data = await response.json()
      setAirline(data)
  }

  
  const getUserToken = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      setToken(accessToken);
      const flightData = await getSaved(user?.email, accessToken);
      setSavedFlights(flightData);
      setIsloading(false)
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    isAuthenticated && getUserToken() && fetchData(); 
  }, [user?.sub]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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
        <div className="d-flex mt-3 flex-column ">
          {token && savedFlights.length > 0 ? (
        savedFlights?.map((flight, idx) => (
          <div key={idx} className="card mt-3 border border-dark">
            <div className="card-header d-flex justify-content-between">
            <div>
                            <span className="h3">${flight.price} </span>
                            <small className="text-muted card-text">per traveler</small>
                        </div>
            <button onClick={() => handleDelete(flight._id)} className="btn btn-danger">Delete Trip</button>
            </div>
            <div className="card-body container-fluid">
            <h5 className="card-title"> {airline[flight.validatingAirlineCodes.join(', ')]}</h5>
            {flight.segments.map((segment, sIdx) => (
                            <div key={sIdx} className="d-flex m-2 rounded border tk-color ">
                                <section className="container-fluid">
                                    <div className="d-flex justify-content-between p-2">
                                        <span>{new Date(segment.departureDateTime).toLocaleString()}</span>
                                        <span>{convertIATACode(segment.originLocation.cityCode)} - {convertIATACode(segment.destinationLocation.cityCode)}</span>
                                        <span>{convertHM(segment.duration)}</span>
                                    </div>
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
      {isLoading  ? <div className="d-flex mt-3"><RotatingLines visible={true} height="96" width="96" color="grey" ariaLabel="rotating-lines-loading" wrapperStyle={{}} wrapperClass=""/></div> : loaded()}
    </div>
  );
}

export default SavedFlights;
