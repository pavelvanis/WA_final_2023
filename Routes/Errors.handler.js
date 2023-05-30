const createError = require('http-errors')
const mongoose = require('mongoose')

module.exports = {
    validId : (id) => {
        if (!mongoose.Types.ObjectId.isValid(id)) 
        throw createError(400, 'Invalid Product Id')
    },
    validation : (error, next) => {
        if(error.name === 'ValidationError'){
            next(createError(422, error.message))
        }
    },
    notFound : (item, message) => {
        if (!item)
            throw createError(404, message)
    }
}
