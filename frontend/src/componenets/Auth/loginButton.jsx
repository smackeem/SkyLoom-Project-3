import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton(){
    const { loginWithRedirect } = useAuth0();
  
    const handleLogin = async () => {
      await loginWithRedirect({
        appState: {
          returnTo: "/",
        },
      });
    };
  
    return <button className="btn btn-success" onClick={handleLogin}>Log In</button>;
  }