import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRoundTrips, getOneWayFlights, formatDateTime } from "../../utilities/flight-service";
import Flights from "../Flights";

const Home = () => {
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [formData, setFormData] = useState({
        originLocationCode: '',
        destinationLocationCode: '',
        departureDate: '',
        returnDate: '',
        adults: '',
        currencyCode: 'USD',
        max: 25
    });

    const [flightData, setFlightData] = useState([])
    const today = formatDateTime();
    // const handleRequest = () => {
    //     setFlightData()
    //     // if (data.ok) {
    //         console.log(data)
    //     // }
    // }

    // useEffect(() => {
    //     handleRequest()
    // }, []);
    const handleRoundTripClick = () => {
        setIsRoundTrip(!isRoundTrip);

    };

    const handleOneWay = () => {
        setIsRoundTrip(!isRoundTrip);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let flights
            if (isRoundTrip) {
                flights = await getRoundTrips(formData)
            } else {
                flights = await getOneWayFlights(formData)
            }
            console.log('fetch', flights)
            setFlightData(flights)
        } catch (err) {
            console.log(err)
        }
        // setFormData({
        //     originLocationCode: '',
        //     destinationLocationCode: '',
        //     departureDate: '',
        //     adults: '',
        //     max: 25
        // })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="d-flex flex-lg-column mt-5 p-2 flex-column">
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a className={`nav-link ${!isRoundTrip ? 'active' : ''}`} onClick={handleOneWay}>One-Way</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${isRoundTrip ? 'active' : ''}`} onClick={handleRoundTripClick}>Round-Trip</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className=" d-flex form-row">
                            <div className=" col-md-6">
                                <label htmlFor="originLocationCode">Location</label>
                                <input className="p-2" type="text" name="originLocationCode" value={formData.originLocationCode} onChange={handleChange} placeholder="Leaving from" />
                            </div>
                            <div className=" col-md-6">
                                <label htmlFor="destinationLocationCode">Destination</label>
                                <input className="p-2" type="text" name="destinationLocationCode" value={formData.destinationLocationCode}  onChange={handleChange} id="" placeholder="Going to" />
                            </div>
                        </div>
                        <div className="d-flex  form-row">
                            <div className="mt-3 col-md-6">
                                <label htmlFor="departureDate">Departure</label>
                                <input className="p-2" type="date" name="departureDate" value={formData.departureDate} min={today} onChange={handleChange} />

                            </div>

                            {isRoundTrip && (
                                <div className="mt-3 col-md-4">
                                    <label htmlFor="returnDate">Return</label>
                                    <input className="p-2" type="date" name="returnDate" value={formData.returnDate} min={today} onChange={handleChange} />
                                </div>
                            )}
                            <div className="mt-3">
                            <label htmlFor="adults">Travelers</label>
                        <input className="p-2" type="select" name="adults" value={formData.adults} onChange={handleChange} placeholder="How Many?" />
                            </div>
                        </div>
                                <div className="container mt-3">
                                <button type="submit" >Find Flights</button>
                                </div>
                                <div>
                                    input
                                </div>
                        


                        
                    </form>
                </div>

            </div>
            <div className="card m-3 text-center"><Flights allFlights={flightData} /> </div>

        </div>
    )
}

export default Home;