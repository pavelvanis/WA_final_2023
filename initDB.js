
const mongoose = require('mongoose')

module.exports = (app) => {
    mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME, 
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD
})
    .then((result) => {
        console.log('mongodb is connected...');
    }).catch((err) => {
        console.log(err);
    });

mongoose.connection.on('connected', () => {
    console.log('Mongoose db was connected...');
})

mongoose.connection.on('error', () => {
    console.log('Error in mongoose...');
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose db was disconnected...');
})

process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('Mongoose DB was disconnected due to app termination...');
    process.exit(0)
})

app.get('/api', (req, res, next) => {
    if (mongoose.connection.readyState === 1) {
      res.status(200).json({ status: 'on' });
    } else {
      res.status(500).json({ status: 'off' });
    }
  });

}
