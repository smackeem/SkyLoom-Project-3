import { Routes, Route } from "react-router";
import Home from "../../pages/Home";
import Flights from "../../pages/Flights";
import FlightTracker from "../../pages/Filtered";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/flights" element={<Flights />}/>
                <Route path="/tracker" element={<FlightTracker />}/>
            </Routes>
        </main>
    )
}

export default Main;