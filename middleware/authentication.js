const jwt = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) throw createError(401, 'Token is not provided')
        console.log(token);
        console.log(process.env.SECRET_KEY);
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decode);
        next()
    } catch (error) {
        console.log(error);
        next(createError(401, 'Invalid token'))
    }
}