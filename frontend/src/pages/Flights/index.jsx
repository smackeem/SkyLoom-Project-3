import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react"
import { getPricing } from "../../utilities/flight-service";
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
                    <div key={idx} className="d-flex p-5 m-2 align-items-start flex-column rounded border ">
                        <button onClick={() => handleSaveTrip(flight)} className={`btn btn-success ${savedf(flight) ? '' : 'disabled'}`}>Save Trip</button>
                        <p>Price: {flight.price}</p>
                        <p> {airline[flight.validatingAirlineCodes.join(', ')]}</p>
                            { bool = flight.segments.length > 1 ? true : false}
                        {flight.segments.map((segment, sIdx) => (
                            <div key={sIdx} className="d-flex card-group m-2 align-items-start rounded border ">
                                <section className="card">
                                <p>{new Date(segment.departureDateTime).toLocaleString()}</p>
                                <p>Duration: {segment.duration}</p>
                                <p className="text-muted">{bool ? 'Non-Stop' : 'Connecting'}</p>
                                <p>{segment.originLocation.cityCode} - {segment.destinationLocation.cityCode}</p>
                                </section>
                                </div>
                        ))}

                    </div>
                ))}
            </div>
    )
}

export default Flights