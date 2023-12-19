import { Routes, Route } from "react-router";
import Home from "../../pages/Home";
import Flights from "../../pages/Flights";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/flights" element={<Flights />}/>
            </Routes>
        </main>
    )
}

export default Main;