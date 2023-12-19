const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    user: [],
    to: String,
    from: String,
    departDate: Date,
    returnDate: Date
},{
    timestamps: true
});

module.exports = mongoose.model("Flight", FlightSchema);