const { VITE_BASE_URL, 
    VITE_DB_URL, 
    VITE_API_KEY, 
    VITE_API_SECRET, 
    VITE_AUTH0_DOMAIN, 
    VITE_AUTH0_CLIENTID, 
    VITE_AUTH0_CALLBACK_URL, 
    VITE_AUTH0_AUDIENCE } = import.meta.env

export default {
    BASE_URL: VITE_BASE_URL,
    DB_URL: VITE_DB_URL,
    API_KEY: VITE_API_KEY,
    API_SECRET: VITE_API_SECRET,
    DOMAIN: VITE_AUTH0_DOMAIN,
    CLIENTID: VITE_AUTH0_CLIENTID,
    CALLBACK_URL: VITE_AUTH0_CALLBACK_URL,
    AUTH0_AUDIENCE: VITE_AUTH0_AUDIENCE
}