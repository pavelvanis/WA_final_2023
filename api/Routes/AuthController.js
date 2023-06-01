const User = require('../Models/User.model')
const createError = require('http-errors')
const errorHandler = require('./Errors.handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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

            const token = await jwt.sign({ name: user.email }, process.env.SECRET_KEY)
            if (!check) throw createError(401, 'Bad password')

            res.send({
                message: 'Successful login', token: token, user: {
                    attributes: user.attributes,
                    email: user.email,
                    name: user.name,
                    phone: user.phone
                }
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