const mongoose = require('mongoose')
const Offer = require('../../Models/Offer.model')
const errorHandler = require('../Errors.handler')

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const offers = await Offer.find({}, { __v: 0 })
            res.send(offers)
        } catch (error) {
            next(error)
        }
    },
    create: async (req, res, next) => {
        try {
            const offer = new Offer(req.body)
            const result = await offer.save()
            res.send(result)
        } catch (error) {
            errorHandler.validation(error, next)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const offer = await Offer.findById(id)
            errorHandler.notFound(offer, 'Offer not found')
            res.send(offer)
        } catch (error) {
            console.log(error.message);
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const updates = req.body
            const options = { new: true }
            const result = await Offer.findByIdAndUpdate(id, updates, options)
            errorHandler.notFound(result, 'Offer not found')
            res.send(result)
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const result = await Offer.findByIdAndDelete(id)
            errorHandler.notFound(result, 'Offer not found')
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}