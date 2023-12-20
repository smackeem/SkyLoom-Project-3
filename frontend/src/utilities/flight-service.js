import * as flightAPI from './flight-api'

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

export async function getFlights(){
    try{
        const flightInfo = await flightAPI.lookUpFlight()
        console.log('service', flightInfo)
        if(flightInfo.ok){
            return flightInfo.json()
        }
    }catch(err){
        return err
    }
}

export async function getOneWayFlights(data){
    try{
        const oneWayflights = await flightAPI.getOneWay(data)
        console.log('service', oneWayflights)
        if(oneWayflights.data){
            const processData = processFlights(oneWayflights)
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
            return processData
        }
    }catch(err){
        return err
    }
}

