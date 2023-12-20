const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    price: String,
    segments: [{
        departureDateTime: String,
        destinationLocation: {
            cityCode: String,
            countryCode: String
        },
        duration: String,
        isNonStop: Boolean,
        originLocation: {
            cityCode: String,
            countryCode: String
        }
    }],
    validatingAirlineCodes: [String]
},{
    timestamps: true
});

module.exports = mongoose.model("Flight", FlightSchema);