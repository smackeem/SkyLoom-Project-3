import { useEffect, useState } from 'react';
import axios from 'axios';

const FlightTracker = () => {
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.aviationstack.com/v1/flights', {
          params: {
            access_key: '242ec52fc9cb34bf214a63d9dd326258',
          },
        });

        const apiResponse = response.data;

        if (Array.isArray(apiResponse['results'])) {
          const filteredFlights = apiResponse['results'].filter(
            flight => !flight['live']['is_ground']
          );
          setFlights(filteredFlights);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that useEffect runs once on component mount

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {flights.map(flight => (
        <div key={flight['flight']['iata']}>
          <p>
            {flight['airline']['name']} flight {flight['flight']['iata']} from{' '}
            {flight['departure']['airport']} ({flight['departure']['iata']}) to{' '}
            {flight['arrival']['airport']} ({flight['arrival']['iata']}) is in the air.
          </p>
        </div>
      ))}
    </div>
  );
};

export default FlightTracker;
