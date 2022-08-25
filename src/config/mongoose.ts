import mongoose from 'mongoose'
import logger from './logger'

mongoose.connection.on('error', (err) => {
  logger.error(`MongoDB connection error: ${err}`)
  process.exit(-1)
})

let connectToDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/whatsontap')
    .then(() => logger.info('Connected to DB'))

  return mongoose.connection
}

export default connectToDB
