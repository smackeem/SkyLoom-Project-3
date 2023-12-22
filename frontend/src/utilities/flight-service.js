import * as flightAPI from './flight-api'
import airportData from '../assets/airports.json'

const processFlights = (apiResponse) => {
    const processedFlights = [];

    for (const flight of apiResponse.data) {
      const itineraries = flight.itineraries;
      const price = `${flight.price.total} ${flight.price.currency}`;
      const validatingAirlineCodes = flight.validatingAirlineCodes; 

      const flightDetails = {
        price,
        validatingAirlineCodes,
        segments: [],
      };

      for (const itinerary of itineraries) {
        const segments = itinerary.segments;

        for (const segment of segments) {
          const departure = segment.departure;
          const arrival = segment.arrival;
          const duration = segment.duration;
          const isNonStop = segment.numberOfStops === 0;

          const segmentDetails = {
            departureDateTime: departure.at,
            duration,
            isNonStop,
            originLocation: apiResponse.dictionaries.locations[departure.iataCode],
            destinationLocation: apiResponse.dictionaries.locations[arrival.iataCode],
          };

          flightDetails.segments.push(segmentDetails);
        }
      }
      processedFlights.push(flightDetails);
    }
    return processedFlights;
};


export async function getOneWayFlights(data){
    try{
        const oneWayflights = await flightAPI.getOneWay(data)
        console.log('service', oneWayflights)
        if(oneWayflights.data){
            const processData = processFlights(oneWayflights)
            console.log('.data', oneWayflights.data)
            console.log('processed', processData)
            return processData
        }
    }catch(err){
        return err
    }
}

export async function getRoundTrips(data){
    try{
        const roundTrips = await flightAPI.getRoundTrip(data)
        console.log('service', roundTrips)
        if(roundTrips.data){
            const processData = processFlights(roundTrips)
            console.log('.data', roundTrips.data)
            console.log('processed', processData)
            return processData
        }
    }catch(err){
        return err
    }
}

export async function getPricing(data){
    try{
        const pricing = await flightAPI.getPricingData(data)
        console.log('service', pricing)
        if(pricing.data){
            const processData = processFlights(pricing)
            
            return processData
        }
    }catch(err){
        return err
    }
}

export async function addToDB(data, token){
    try{
        console.log('data being passed',data)
        const newFlight = await flightAPI.createDB(data, token)
        return newFlight;
      }catch(err){
      console.log(err)
      return err;
      }
}

export async function getSaved(data, token){
    try{
        console.log('data being passed',data)
        const savedFlights = await flightAPI.saved(data, token)
        return savedFlights;
      }catch(err){
      console.log(err)
      return err;
      }
}

export async function removeSaved(id, token){
    try{
        console.log('data being passed',id)
        const destroyed = await flightAPI.destroy(id, token)
        return destroyed;
      }catch(err){
      console.log(err)
      return err;
      }
}

export function formatDateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

export function convertHM(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
  
    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
  
    const formattedTime = `${hours}h ${minutes}m`;
    return formattedTime;
  }

  export function convertIATACode(iata){
    const airportInfo = airportData[iata];
    if (airportInfo) {
      return `${airportInfo} (${iata})`;
    } else {
      return 'Airport not found for the given IATA code.';
    }
  }