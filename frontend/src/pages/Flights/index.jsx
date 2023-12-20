import { useState, useEffect } from "react";

const Flights = ({ allFlights }) => {
    const [airline, setAirline] = useState('')
    const fetchData = async () => {
        const response = await fetch('../../../public/airlines.json');
        const data = await response.json()
        setAirline(data)
      }
    
      useEffect(() => {
        fetchData()
      }, [])
      let bool;
    return (
        <div className="d-flex m-3 flex-column">
            <h1>Flights</h1>
            <div>
                {allFlights.map((flight, idx) => (
                    <div key={idx} className="d-flex p-5 m-2 align-items-start flex-column rounded border ">
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
        </div>
    )
}

export default Flights;