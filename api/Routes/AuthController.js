const User = require('../Models/User.model')
const createError = require('http-errors')
const errorHandler = require('./Errors.handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


module.exports = {
    signup: async (req, res, next) => {
        try {
            const check = await User.findOne({ email: req.body.email })
            if (check) throw createError(409, 'User with this email already exist')
            const hash = await bcrypt.hash(req.body.password, 10)
            const user = new User({ ...req.body, password: hash })
            const result = await user.save()
            res.send(result)
        } catch (error) {
            console.log(error);
            errorHandler.validation(error, next)
        }
    },
    login: async (req, res, next) => {
        const username = req.body.username
        const password = req.body.password
        try {
            const user = await User.findOne({ $or: [{ email: username }, { phone: username }] })
            const check = await bcrypt.compare(password, user.password)
            console.log(check);
            const token = await jwt.sign({ name: user.email }, process.env.SECRET_KEY)
            if(!check) throw createError(401, 'Bad password')
            res.send({ message: 'Successful login', token: token })
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