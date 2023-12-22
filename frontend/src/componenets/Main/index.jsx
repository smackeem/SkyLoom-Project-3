import { Routes, Route } from "react-router";
import Home from "../../pages/Home";
import SavedFlights from "../../pages/SavedFlights";
import Profile from "../../pages/Profile";
import Error from "../../pages/Error";
import Show from "../../pages/Show";

const Main = () => {
    return (
        <main>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/saved" element={<SavedFlights />}/>
                <Route path="/saved/:id" element={<Show />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="*" element={<Error />}/>
            </Routes>
        </main>
    )
}

export default Main;