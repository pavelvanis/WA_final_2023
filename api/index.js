
const authenticate = require('../middleware/authentication')

module.exports = (app, mongoose) => {
    const houseRouter = require('./Routes/House/House.route')
    app.use('/api/house', authenticate, houseRouter)

    const offerRouter = require('./Routes/Offers/Offer.route')
    app.use('/api/offer', authenticate, offerRouter)

    const userRouter = require('./Routes/User/User.route')
    app.use('/api/user', authenticate, userRouter)

    const authController = require('./Routes/AuthController')
    app.post('/signup', authController.signup)
    app.post('/login', authController.login)
    app.post('/logout', authController.logout)
}