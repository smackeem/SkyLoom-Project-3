import { useState } from "react";

const Flights = ({ allFlights }) => {

    return (
        <div className="d-flex m-3 flex-column">
            <h1>Flights</h1>
            <div>
                {allFlights.map((flight, idx) => (
                    <div key={idx} className="d-flex p-5 m-2 align-items-start flex-column rounded border ">
                        <p>Price: {flight.price}</p>
                        <p>Validating Airline Codes: {flight.validatingAirlineCodes.join(', ')}</p>

                        {flight.segments.map((segment, sIdx) => (
                            <div key={sIdx} className="d-flex flex-row card-group m-2 align-items-start rounded border ">
                                <section className="card">
                                <p>Departure Date and Time: {segment.departureDateTime}</p>
                                <p>Duration: {segment.duration}</p>
                                <p className="text-muted">{segment.isNonStop ? 'Non-Stop' : 'Connecting'}</p>
                                <p>Origin Location: {segment.originLocation.cityCode}, {segment.originLocation.countryCode}</p>
                                <p>Destination Location: {segment.destinationLocation.cityCode}, {segment.destinationLocation.countryCode}</p>
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