const Flight = require('../models/trackedFlight');

module.exports = {
    create,
    index,
    delete: destroy
}

async function index(req, res, next){
    try{
        res.status(200).json(await Flight.find());
    }catch(err){
        res.status(400).json({err: err.message});
    }
}