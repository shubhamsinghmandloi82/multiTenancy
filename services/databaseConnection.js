const mongoose = require('mongoose')
const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
}

function connectDB() {
  return new Promise((resolve, reject) => {
    const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`
    const mongoLocalUrl = `mongodb://localhost:27017`
    mongoose
      .connect(mongoLocalUrl, mongoOptions)
      .then((conn) => {
        console.log('MongoDb Connected Successfully')
        resolve(conn)
      })
      .catch((error) => reject(error))
  })
}

module.exports = connectDB 