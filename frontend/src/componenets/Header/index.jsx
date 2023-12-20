import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
            <a className="navbar-brand" href="#">SkyLoom</a>
            <Link  to="/tracker">Tracker</Link>
        </nav>
    )
}

export default Header;