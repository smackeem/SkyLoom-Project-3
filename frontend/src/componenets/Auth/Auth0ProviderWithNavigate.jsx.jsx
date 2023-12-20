import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import config from '../../config';

const Auth0ProviderWithNavigate = ({children}) => {
  const navigate = useNavigate();
  const domain = config.DOMAIN
  const clientid = config.CLIENTID
  const callbackUrl = config.CALLBACK_URL
  if (!(domain && clientid && callbackUrl)) {
    return null;
  }
  
  // depending on the architecture of the application, this code can be used to prevent the application from loading, though a redirect call could navigate a user to an error page.
  
  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  
    // this function will be used by Auth0 Provider to check the component appState prop and determine a redirect location, or will return the current page
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientid}
      authorizationParams={{ redirect_uri: callbackUrl}}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
