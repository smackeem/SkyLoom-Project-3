// const Flight = ({flight}) => {
//     return (
//         <div className="d-flex p-5 m-2 align-items-start flex-column rounded border ">
//                         <button onClick={() => handleSaveTrip(flight)} className={`btn btn-success ${savedf(flight) ? '' : 'disabled'}`}>Save Trip</button>
//                         <p>Price: {flight.price}</p>
//                         <p> {airline[flight.validatingAirlineCodes.join(', ')]}</p>
//                             { bool = flight.segments.length > 1 ? true : false}
//                         {flight.segments.map((segment, sIdx) => (
//                             <div key={sIdx} className="d-flex card-group m-2 align-items-start rounded border ">
//                                 <section className="card">
//                                 <p>{new Date(segment.departureDateTime).toLocaleString()}</p>
//                                 <p>Duration: {segment.duration}</p>
//                                 <p className="text-muted">{bool ? 'Non-Stop' : 'Connecting'}</p>
//                                 <p>{segment.originLocation.cityCode} - {segment.destinationLocation.cityCode}</p>
//                                 </section>
//                                 </div>
//                         ))}
//                 </div>
//     )
// }

// export default Flight;