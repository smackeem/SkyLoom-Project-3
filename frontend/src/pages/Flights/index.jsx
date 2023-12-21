import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { convertHM, convertIATACode} from "../../utilities/flight-service";
import { addToDB } from "../../utilities/flight-service";

const Flights = ({ allFlights }) => {
    const [airline, setAirline] = useState([])
    const [savedFlights, setSavedFlights] = useState([]);
    const { isLoading: loadingAuth, isAuthenticated, user, getAccessTokenSilently } = useAuth0()
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
        // Check if the flight is not already saved
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
        
            <div className="d-flex m-3 flex-column">
                {allFlights.map((flight, idx) => (
                    <div key={idx} className="card ">
                        { bool = flight.segments.length > 1 ? true : false}
                        <div className="card-header">
                        <span className="h1">${flight.price}</span>
                        <button onClick={() => handleSaveTrip(flight)} className={`btn btn-success ${savedf(flight) ? '' : 'disabled'}`}>Save Trip</button>
                    
                        </div>
                        <div className="card-body container-fluid">
                        <span className="col-md-4"> {airline[flight.validatingAirlineCodes.join(', ')]}</span>
                        <p className="text-muted">{bool ? 'Connecting': 'Non-Stop' }</p>
                        {flight.segments.map((segment, sIdx) => (
                            <div key={sIdx} className="d-flex m-2 rounded border ">
                                <section className="container-fluid">
                                <p>{new Date(segment.departureDateTime).toLocaleString()}</p>
                                <p>Duration: {convertHM(segment.duration)}</p>
                                
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