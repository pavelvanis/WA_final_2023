const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfferSchema = new Schema({
    houseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'House'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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