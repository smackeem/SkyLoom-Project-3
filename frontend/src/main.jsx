import { BrowserRouter as Router } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Auth0Provider from "./componenets/Auth/Auth0ProviderWithNavigate.jsx.jsx"
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Router>
    <Auth0Provider>
    <App />
    </Auth0Provider>
  </Router>,
)
