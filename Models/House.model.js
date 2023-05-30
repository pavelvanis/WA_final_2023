const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HouseSchema = new Schema({
    adress: {
        country: {
            type: String,
            required: true
        },
        state: String,
        city: String,
        postal_code: String,
        line: String,
        coordinates: {
            lon: Number,
            lat: Number
        }
    },
    features: {
        garden: Number,
        garage: Number,
        pool: Boolean,
        cooling: {
            type: String,
            required: true
        },
        heating: {
            type: String,
            required: true
        },
        other: [
            {
                info: String
            }
        ]
    },
    properties: {
        build_sqft: {
            type: Number,
            required: true
        },
        total_sqft: {
            type: Number,
            required: true
        },
        year_built: {
            type: Date,
            required: true
        },
        floors: {
            type: Number,
            required: true
        },
        prices: [
            {
                date: {
                    type: Date,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    sales: [
        {
            date: {
                type: Date,
                default: Date.now(),
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        }
    ]
});

const House = mongoose.model('house', HouseSchema)
module.exports = House