const { VITE_BASE_URL, VITE_DB_URL, VITE_API_KEY, VITE_API_SECRET } = import.meta.env

export default {
    BASE_URL: VITE_BASE_URL,
    DB_URL: VITE_DB_URL,
    API_KEY: VITE_API_KEY,
    API_SECRET: VITE_API_SECRET
}