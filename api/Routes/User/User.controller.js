const mongoose = require('mongoose')
const User = require('../../Models/User.model')
const errorHandler = require('../Errors.handler')
const createError = require('http-errors')
const bcrypt = require('bcrypt')


module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find({}, { __v: 0 })
            errorHandler.notFound(users, 'Users not found')
            res.send(users)
        } catch (error) {
            next(error)
        }
    },
    create: async (req, res, next) => {
        try {
            const user = new User(req.body)
            const result = await user.save()
            res.send(result)
        } catch (error) {
            errorHandler.validation(error, next)
        }
    },
    getOne: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)

            const user = await User.aggregate([
                { $match: { _id: new mongoose.Types.ObjectId(id) } },
                {
                    $lookup: {
                        from: 'houses',
                        localField: 'attributes.houses.houseId',
                        foreignField: '_id',
                        as: 'houses',
                    },
                },
                {
                    $lookup: {
                        from: 'offers',
                        localField: 'attributes.offers.offerId',
                        foreignField: '_id',
                        as: 'offers',
                    },
                },
            ]);

            console.log(user);
            errorHandler.notFound(user, 'User not found')
            res.send(user)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    update: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const updates = req.body
            const options = { new: 0 }
            const result = await User.findByIdAndUpdate(id, updates, options)
            errorHandler.notFound(result, 'User not found')
            res.send(result)
        } catch (error) {
            next(error)
        }
    },
    delete: async (req, res, next) => {
        try {
            const id = req.params.id
            errorHandler.validId(id)
            const result = await User.findByIdAndDelete(id)
            errorHandler.notFound(result, 'user not found')
            res.send(result)
        } catch (error) {
            next(error)
        }
    }
}