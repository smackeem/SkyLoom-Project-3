const Flight = require('../models/flight');

module.exports = {
    create,
    index,
    delete: destroy,
    show
}

async function index(req, res, next){
    try{
        const userId = req.headers.user
        console.log(userId)
        res.status(200).json(await Flight.find({'user.email': userId}));
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

async function create(req, res, next){
    try{
        const newFlight = new Flight({
            user: {
                sub: req.body.user.sub,
                name: req.body.user.name,
                email: req.body.user.email,
            },
            price: req.body.price,
            segments: req.body.segments,
            validatingAirlineCodes: req.body.validatingAirlineCodes
        });
        const savedFlight = await newFlight.save();
        res.status(200).json({flight: savedFlight});
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

async function show(req, res, next){
    try{
        res.status(200).json(await Flight.findById(req.params.id))
    }catch(err){
        res.status(400).json({err: err.message});
    }
}