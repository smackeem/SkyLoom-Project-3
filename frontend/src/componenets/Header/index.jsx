import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/loginButton";
import LogoutButton from "../Auth/LogoutButton";
import './Header.css'

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <nav className="p-4 navbar navbar-dark bg-dark sticky-top">
            <div id='nav-tab'>
                <Link className="navbar-brand" to="/">SkyLoom</Link>
            </div>

            <div id='nav-tab'>
                {!isLoading ? (
                    isAuthenticated ? (
                        <div>
                            <Link className="p-2" to="/saved">Saved Flights</Link>
                            <Link className="p-2" to="/profile"><img className="img rounded-circle" src={user.picture} alt={""} /></Link>
                            <LogoutButton />
                        </div>
                    ) : (
                        <LoginButton />
                    )
                ) : null}
            </div>
        </nav>
    )
}

export default Header;