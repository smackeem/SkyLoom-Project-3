import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { convertHM, convertIATACode} from "../../utilities/flight-service";
import { addToDB } from "../../utilities/flight-service";

const Flights = ({ allFlights }) => {
    const [airline, setAirline] = useState([])
    const [savedFlights, setSavedFlights] = useState([]);
    const { isLoading: loadingAuth, isAuthenticated, user, getAccessTokenSilently, loginWithRedirect } = useAuth0()
    const [token, setToken] = useState()
    const [saved, setSaved] = useState(false);
  
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

    const fetchData = async () => {
        const response = await fetch('/airlines.json');
        const data = await response.json()
        setAirline(data)
      }
    
      useEffect(() => {
        fetchData()
      }, [])

      const savedf = async(f) => {
        if (savedFlights.includes(f)) {
            return true
          }
      }

      const handleSaveTrip = async(flight) => {
        if(!isAuthenticated){
            loginWithRedirect();
            return;
        }
        console.log(flight)
        const data = { ...flight, user: user}
        const flightData = await addToDB(data, token)
        console.log(flightData)
        if (!savedFlights.includes(flight)) {
          setSavedFlights([...savedFlights, flight]);
        }
        console.log('saved', savedFlights)
      };
      let bool;
    return (
        
            <div className="d-flex mt-3 flex-column">
                {allFlights.map((flight, idx) => (
                    <div key={idx} className="card mt-3">
                        { bool = flight.segments.length > 1 ? true : false}
                        <div className="card-header d-flex justify-content-between">
                            <div>
                            <span className="h1">${flight.price} </span>
                            <small className="text-muted card-text">per traveler</small>
                            </div>
                        
                        <button onClick={() => handleSaveTrip(flight)} className={`btn btn-success ${savedf(flight) ? '' : 'disabled'}`}>Save Trip</button>
                        
                        
                    
                        </div>
                        <div className="card-body container-fluid">
                        <h5 className="card-title"> {airline[flight.validatingAirlineCodes.join(', ')]}</h5>
                        {/* <p className="text-muted">{bool ? 'Connecting': 'Non-Stop' }</p> */}
                        {flight.segments.map((segment, sIdx) => (
                            <div key={sIdx} className="d-flex m-2 rounded border tk-color ">
                                <section className="container-fluid">
                                <span>{new Date(segment.departureDateTime).toLocaleString()}</span>
                                <span className="text-muted">Duration: {convertHM(segment.duration)}</span>
                                
                                <p>{convertIATACode(segment.originLocation.cityCode)} - {convertIATACode(segment.destinationLocation.cityCode)}</p>
                                </section>
            
                                </div>
                                
                        ))}
                        </div>
                        
                        
                        
                        
                        
                            
                        

                    </div>
                ))}
            </div>
    )
}

export default Flights