const mongoose = require('mongoose')
const House = require('../../Models/House.model')
const createError = require('http-errors')
const errorHandler = require('../Errors.handler')


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const housesWithUsers = await House.aggregate([
                {
                  $lookup: {
                    from: 'users', // Název kolekce (tabulky) uživatelů
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                  }
                }
              ]);

            //   console.log(housesWithUsers);
              
            // const results = await House.find({}, { __v: 0 })
            res.send(housesWithUsers)
        } catch (error) {
            console.log(error.message)
        }
    },
    create: async (req, res, next) => {
        try {
            // console.log(req.body);
            const house = new House(req.body)
            const result = await house.save()
            console.log(result);
            res.send(result)
        } catch (error) {
            errorHandler.validation(error, next)
        }
    },
    findOne: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const house = await House.findById(id)
            errorHandler.notFound(house, 'House does not found.')
            res.send(house)
        } catch (error) {
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const updates = req.body
            const options = { new: true }
            const result = await House.findByIdAndUpdate(id, updates, options)
            errorHandler.notFound(result, 'House does not found.')
            res.send(result)
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const result = await House.findByIdAndRemove(id)
            errorHandler.notFound(id, 'House doesn not found.')
        } catch (error) {
            next(error)
        }
    }
}

