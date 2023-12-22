import { useState, useEffect } from "react";
import { convertHM, convertIATACode } from "../../utilities/flight-service";


const FlightItem = ({ flight, handleSaveTrip, notSaved }) => {
    const [airline, setAirline] = useState([])

    const fetchData = async () => {
        const response = await fetch('/airlines.json');
        const data = await response.json()
        setAirline(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="card mt-3 border border-dark">   
                    <div className="card-header d-flex justify-content-between">
                        <div>
                            <span className="h3">${flight.price} </span>
                            <small className="text-muted card-text">per traveler</small>
                        </div>
                        <button onClick={() => handleSaveTrip(flight)} className={`btn btn-success ${notSaved(flight) ? '' : 'disabled'}`}>Save Trip</button>
                    </div>
                    <div className="card-body container-fluid">
                        <h5 className="card-title"> {airline[flight.validatingAirlineCodes.join(', ')]}</h5>
                        {/* <p className="text-muted">{bool ? 'Connecting': 'Non-Stop' }</p> */}
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
    )
}

export default FlightItem;