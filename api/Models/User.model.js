const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    attributes: {
        email: {
            type: String,
            required: true
        },
        pass: {
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
        }
    },
    offers: [
        {
            offerId: {
                type: String,
                required: true
            },
        }
    ],
    houses: [
        {
            houseId: {
                type: String,
                required: true
            }
        }
    ],
    subscribes: [
        {
            offerId: {
                type: String,
                required: true
            }
        }
    ]
})

const User = mongoose.model('user', UserSchema)
module.exports = User