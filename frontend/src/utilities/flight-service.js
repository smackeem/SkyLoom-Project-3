import * as flightAPI from './flight-api'

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
            return oneWayflights.data
        }
    }catch(err){
        return err
    }
}

export async function getRoundTrips(data){
    try{
        const roundTrips = await flightAPI.getOneWay(data)
        console.log('service', roundTrips)
        if(roundTrips.data){
            return roundTrips.data
        }
    }catch(err){
        return err
    }
}