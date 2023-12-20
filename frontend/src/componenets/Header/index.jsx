import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/loginButton";
import LogoutButton from "../Auth/LogoutButton";

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
            <Link className="navbar-brand" to="/">SkyLoom</Link>
            
            
            <div>
        {/* A nested ternary can conditionally render multiple states */}
        {!isLoading ? (
          isAuthenticated ? (
            <span>
                <Link to="/saved">Saved Flights</Link>
              <Link to="/profile">Profile</Link> || <LogoutButton />
            </span>
          ) : (
            <LoginButton />
          )
        ) : null}
            </div>
        </nav>
    )
}

export default Header;