const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HouseSchema = new Schema({
    "id": "string",
    "location": {
        "state": "string",
        "city": "string",
        "adressLine": "string",
        "": ""
    },
    "sales": [
        {
            "date": "'05-01-2012'",
            "value": "integer",
            "currency": "'EUR'"
        }
    ],
    "features": {
        "cooling": {
            "value": true,
            "type": "'central'"
        },
        "heating": {
            "value": true,
            "heatingType": "'Forced Air'"
        },
        "floors": 2,
        "garage": {
            "value": true,
            "squareFootage": 15
        },
        "pool": {
            "value": true,
            "squareFootage": 15
        },
        "other": [
            "'gazebo'",
            "grill"
        ]
    }
})

const House = mongoose.model('house', HouseSchema)
module.exports = House