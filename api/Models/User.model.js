const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    name: {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        }
    },
    attributes: {
        offers: [
            {
                offerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Offer'
                },
            }
        ],
        houses: [
            {
                houseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'House'
                },
            }
        ],
        subscribes: [
            {
                offerId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Offer'
                }
            }
        ]
    }

})

const User = mongoose.model('user', UserSchema)
module.exports = User