import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getRoundTrips,
  getOneWayFlights,
  formatDateTime,
} from "../../utilities/flight-service";
import Flights from "../Flights";

const Home = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [formData, setFormData] = useState({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    currencyCode: "USD",
    max: 25,
  });

  const [flightData, setFlightData] = useState([]);
  const today = formatDateTime();

  const handleRoundTripClick = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  const handleOneWay = () => {
    setIsRoundTrip(!isRoundTrip);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      let flights;
      if (isRoundTrip) {
        flights = await getRoundTrips(formData);
      } else {
        flights = await getOneWayFlights(formData);
      }
      console.log("fetch", flights);
      setFlightData(flights);
      setIsloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Object.entries(Airports).forEach(([code, name]) => {
  //     console.log(`${code}: ${name}`);
  //   });
  return (
    <div className="d-flex flex-lg-column mt-5 m-5 p-2 flex-column">
      <div className="jumbotron">
        <h1 className="accent display-4"><b>Hello, world!</b></h1>
        <p className="lead">
          Explore the USA effortlessly as we present you with a
          sorted list of the most budget-friendly flights to any
          city. Get ready to embark on your wallet-friendly
          journey with <span className="accent"><b>SkyLoom</b> </span>– your go-to destination for hassle-free flight
          searches! ✈️🌎
        </p>
        <hr className="my-4" />

        
      </div>
      <div className="card text-center">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <Link
                className={`nav-link accent ${isRoundTrip ? "active" : ""}`}
                onClick={handleRoundTripClick}
              >
                Round-Trip
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link accent ${!isRoundTrip ? "active" : ""}`}
                onClick={handleOneWay}
              >
                One-Way
              </Link>
            </li>
          </ul>
        </div>
        <div className="card-body ">
          <form onSubmit={handleSubmit}>
            <div className=" d-flex m-2 row">
              <div className="mt-3 form-group col-auto">
                <label htmlFor="originLocationCode">Location</label>
                <div className="input-group-prepend"></div>
                <input
                  className="p-2 form-control"
                  type="text"
                  name="originLocationCode"
                  value={formData.originLocationCode}
                  onChange={handleChange}
                  placeholder="Leaving from"
                  minLength={3}
                  maxLength={3}
                  required
                />
              </div>
              <div className="mt-3 form-group col-auto">
                <label htmlFor="destinationLocationCode">Destination</label>
                <div className="input-group-prepend"></div>
                <input
                  className="p-2 form-control"
                  type="text"
                  name="destinationLocationCode"
                  value={formData.destinationLocationCode}
                  onChange={handleChange}
                  id=""
                  placeholder="Going to"
                  minLength={3}
                  maxLength={3}
                  required
                />
              </div>

              <div className="mt-3 form-group col-auto">
                <label htmlFor="departureDate">Departure</label>
                <input
                  className="p-2 form-control"
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  min={today}
                  onChange={handleChange}
                  required
                />
              </div>

              {isRoundTrip && (
                <div className="mt-3 form-group col-auto">
                  <label htmlFor="returnDate">Return</label>
                  <input
                    className="p-2 form-control"
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    min={today}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="mt-3 form-group col-auto">
                <label htmlFor="adults">Travelers</label>
                
                <input
                  className="p-2 form-control mx-sm2"
                  type="number"
                  inputMode="numeric"
                  name="adults"
                  min={1}
                  value={formData.adults}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-auto mt-3">
                <button className="btn btn-success " type="submit">
                  Find Flights
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Flights
        allFlights={flightData}
        status={isLoading}
        tripStat={isRoundTrip}
      />
    </div>
  );
};

export default Home;
