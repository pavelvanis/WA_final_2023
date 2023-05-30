
module.exports = (app) => {
    const houseRouter = require('./Routes/House/House.route')
    app.use('/api/house', houseRouter)

    const offerRouter = require('./Routes/Offers/Offer.route')
    app.use('/api/offer', offerRouter)
    
    const userRouter = require('./Routes/User/User.route')
    app.use('/api/user', userRouter)
}