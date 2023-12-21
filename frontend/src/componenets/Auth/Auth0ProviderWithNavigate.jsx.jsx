/* eslint-disable react/prop-types */
import { Auth0Provider } from '@auth0/auth0-react';
import { useNavigate } from 'react-router';
import config from '../../config';

const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();
  const domain = config.DOMAIN
  const clientid = config.CLIENTID
  const callbackUrl = config.CALLBACK_URL

  const audience = config.AUTH0_AUDIENCE;

  if (!(domain && clientid && callbackUrl, audience)) {
    return null;
  }

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);

  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientid}
      authorizationParams={{ redirect_uri: callbackUrl, audience }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
