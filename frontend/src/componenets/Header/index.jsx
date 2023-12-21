import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Auth/loginButton";
import LogoutButton from "../Auth/LogoutButton";
import './Header.css'

const Header = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    return (
        <nav className="navbar navbar-dark bg-dark sticky-top">
            <div id='nav-tab'>
            <Link className="navbar-brand" to="/">SkyLoom</Link>
            </div>
            
            
            
            <div id='nav-tab'>
        {!isLoading ? (
          isAuthenticated ? (
            <span>
                <Link to="/saved">Saved Flights</Link>
              <Link to="/profile"><img className="img" src={user.picture} alt={""} /></Link>
               <LogoutButton />
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