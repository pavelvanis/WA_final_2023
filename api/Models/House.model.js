const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HouseSchema = new Schema({
    address: {
        country: {
            type: String,
            required: true
        },
        state: String,
        city: String,
        postal_code: String,
        line: {
            type: String,
            required: true
        },
        coordinates: {
            lon: Number,
            lat: Number
        }
    },
    features: {
        garden: Boolean,
        garage: Boolean,
        pool: Boolean,
        cooling: String,
        heating: String,
        other: [
            {
                info: String
            }
        ]
    },
    properties: {
        build_sqft: Number,
        year_built: Date,
        floors: Number,
        rooms: Number,
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
        ],
        photos: [
            {
                name: {
                    type: String,
                    required: true
                },
                data: {
                    type: Buffer,
                    required: true
                },
                content_type: String
            }
        ]
    },
    props: {
        house_type: String,
        status: String,
        sqft: Number,
        price: Number,
        description: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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