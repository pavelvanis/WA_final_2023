const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    houseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    attributes: {
        date: {
            type: Date,
            default: Date.now,
        },
        value: {
            type: Number,
            required: true
        },
    }

}) 

const Offer = mongoose.model('offer', OfferSchema)
module.exports = Offer