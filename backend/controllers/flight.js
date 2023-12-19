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

async function create(req, res, next){
    try{
        res.status(200).json(await Flight.create(req.body));
    }catch(err){
        res.status(400).json({err: err.message})
    }
}

async function destroy(req, res, next){
    try{
        res.status(200).json(await Flight.findByIdAndDelete(req.params.id));
    }catch(err){
        res.status(400).json({err: err.message})
    }
}