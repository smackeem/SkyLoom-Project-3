import { useAuth0 } from "@auth0/auth0-react";

export default function LogoutButton(){
  const { logout } = useAuth0();

  return (
    <button className="btn btn-success "
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Log Out
    </button>
  );
}
