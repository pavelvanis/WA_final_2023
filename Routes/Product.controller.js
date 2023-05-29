
const mongoose = require('mongoose')
const createError = require('http-errors')
const Product = require('../Models/Product.model')


// Check if ID is valid
function validId(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) 
    throw createError(400, 'Invalid Product Id')
}

// Check if validation is ok
function validation(error, next) {
    if(error.name === 'ValidationError'){
        next(createError(422, error.message))
    }
}

// Check if item is exist
function notFound(item, message) {
    if (!item)
        throw createError(404, message)
}


module.exports = {
    // Returns list of all products
    getAllProducts : async (req, res, next) => {
        try {
            const results = await Product.find({}, { __v: 0 })
            res.send(results)
        } catch (error) {
            console.log(error.message)
        }
    },
    // Creates a product
    createProduct : async (req, res, next) => {
        try {
            console.log(req.body);
            const product = new Product(req.body)
            const result = await product.save()
            res.send(result)
        } catch (error) {
            validation(error, next)
        }
    },
    // Return a product by id
    getOneProduct : async (req, res, next) => {
        try {
            const id = req.params.id
            validId(id)
            const product = await Product.findById(id)
            notFound(product, 'Product does not found.')
            res.send(product)
        } catch (error) {
            next(error)
        }
    },
    // Updates a product
    updateProduct : async (req, res, next) => {
        try {
            const id = req.params.id
            validId(id)
            const updates = req.body
            const options = { new: true }
            const result = await Product.findByIdAndUpdate(id, updates, options)
            notFound(result, 'Product does not found')
            res.send(result)
        } catch (error) {
            next(error)
        }
    },
    // Deletes a product by id
    deleteProduct : async (req, res, next) => {
        try {
            const id = req.params.id
            validId(id)
            const result = await Product.findByIdAndDelete(id)
            notFound(result, 'Product does not found')
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}