const User = require('../Models/User.model')
const createError = require('http-errors')
const errorHandler = require('./Errors.handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const axios = require('axios')


module.exports = {
    signup: async (req, res, next) => {
        try {
            const _email = await User.findOne({ email: req.body.email })
            if (_email) throw createError(409, 'User with this email already exist', { reason: 'email' })
            const _phone = await User.findOne({ phone: req.body.phone })
            if (_phone) throw createError(409, 'User with this phone already exist', { reason: 'phone' })

            const hash = await bcrypt.hash(req.body.password, 10)
            const user = new User({ ...req.body, password: hash })
            const result = await user.save()
            res.send(result)
        } catch (error) {
            console.log(error);
            errorHandler.validation(error, next)
            next(error)
        }
    },
    login: async (req, res, next) => {
        const username = req.body.username
        const password = req.body.password
        try {
            const user = await User.findOne({ $or: [{ email: username }, { phone: username }] })
            const check = await bcrypt.compare(password, user.password)

            console.log(user['_id']);
            
            const userData = await User.aggregate([
                { $match: { _id: user['_id'] } },
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

            console.log(userData[0]);

            const token = await jwt.sign({ name: user.email }, process.env.SECRET_KEY)
            if (!check) throw createError(401, 'Bad password')

            res.send({
                message: 'Successful login', token: token, data: userData
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    logout: async (req, res, next) => {
        try {

        } catch (error) {
            console.log(error);
        }
    }
}