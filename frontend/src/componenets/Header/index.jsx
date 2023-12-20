import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
            <Link className="navbar-brand" to="/">SkyLoom</Link>
            <Link to="/flights">Saved Flights</Link>
            <Link  to="/tracker">Tracker</Link>
        </nav>
    )
}

export default Header;