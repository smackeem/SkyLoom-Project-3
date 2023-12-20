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
