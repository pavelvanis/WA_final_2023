const User = require('../Models/User.model')
const createError = require('http-errors')
const errorHandler = require('./Errors.handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const muchLogins = require('../../middleware/muchLogins')

let logs = { name: '', logs: 1 }

const some = ['knedla', 'knedla', 'baky', 'knedla', 'knedla', 'knedla']

/* some.forEach(item => {
   muchLogins(item, logs)
    // console.log(key);
}) */

module.exports = {
    signup: async (req, res, next) => {
        try {
            console.log(req.body);
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
        }
    },
    login: async (req, res, next) => {
        const username = req.body.username
        const password = req.body.password
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        try {
            console.log(req.body);
            const user = await User.findOne({ email: username })
            // Compare input password and hash in DB
            const check = await bcrypt.compare(password, user.password)

            if (!check) {
                muchLogins({ username: username, ip: ip, userId: user['_id'].valueOf() }, logs)
                throw createError(401, 'Bad password')
            }


            // Creates token
            const token = await jwt.sign({ name: user.email }, process.env.SECRET_KEY)

            // Returns data of login user
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
                }

            ]);

            console.log(userData[0]);
            res.send({
                message: 'Successful login', token: token, data: userData[0]
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
}