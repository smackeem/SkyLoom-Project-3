import { Routes, Route } from "react-router";
import Home from "../../pages/Home";
import SavedFlights from "../../pages/SavedFlights";
import Profile from "../../pages/Profile";
import Error from "../../pages/Error";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/saved" element={<SavedFlights />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="*" element={<Error />}/>
            </Routes>
        </main>
    )
}

export default Main;