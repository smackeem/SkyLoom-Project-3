import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFlights, getRoundTrips, getOneWayFlights } from "../../utilities/flight-service";

const Home = () => {
    const [isRoundTrip, setIsRoundTrip] = useState(false);
    const [formData, setFormData] = useState({
        originLocationCode: '',
        destinationLocationCode: '',
        departureDate: '',
        adults: '',
        max: 25
    });
    // const [flightData, setFlightData] = useState([])

    // const handleRequest = async () => {
    //     const data = await getOneWayFlights();
    //     // if (data.ok) {
    //         console.log(data)
    //     // }
    // }

    // useEffect(() => {
    //     handleRequest()
    // }, []);
    const handleRoundTripClick = () => {
        setIsRoundTrip(!isRoundTrip); // Toggle Round-Trip state
    };

    const handleNotRoundTrip = () => {
        setIsRoundTrip(!isRoundTrip); // Toggle Round-Trip state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //console.log(formData)
            const flights = isRoundTrip ? await getRoundTrips(formData) : await getOneWayFlights(formData);
            console.log('fetch', flights.data)
        } catch (err) {
            console.log(err)
        }
        setFormData({
            originLocationCode: '',
            destinationLocationCode: '',
            departureDate: '',
            adults: '',
            max: 25
        })
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div>
            <div className="card text-center">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a className={`nav-link ${!isRoundTrip ? 'active' : ''}`} onClick={handleNotRoundTrip}>One-Way</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${isRoundTrip ? 'active' : ''}`} onClick={handleRoundTripClick}>Round-Trip</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="originLocationCode">Location</label>
                        <input type="text" name="originLocationCode" value={formData.originLocationCode} onChange={handleChange} placeholder="To" />

                        <label htmlFor="destinationLocationCode">Destination</label>
                        <input type="text" name="destinationLocationCode" value={formData.destinationLocationCode} onChange={handleChange} id="" placeholder="From" />

                        <label htmlFor="departureDate">Departure Date</label>
                        <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} />

                        {isRoundTrip && (
                            <div>
                                <label htmlFor="returnDate">Return Date</label>
                                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} />
                            </div>
                        )}

                        <label htmlFor="adults">Adults</label>
                            <input type="number" name="adults" value={formData.adults} onChange={handleChange} placeholder="How Many?" />
                        

                        <button type="submit" >Find Flights</button>
                    </form>
                </div>
            </div>


        </div>
    )
}

export default Home;