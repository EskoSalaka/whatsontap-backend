import mongoose from 'mongoose'
import Bar from '../models/bar'
import bars from './bars'

// Populates a fresh database with all the required data needed to run the app.
// Currently only bars are needed
let populateDB = async (mongodb_uri: string = null) => {
  try {
    await mongoose.connect(
      mongodb_uri || 'mongodb://localhost:27017/whatsontap'
    )

    console.log('Conneected to mongodb. Dropping old database...')
    await mongoose.connection.dropDatabase()

    console.log('Inserting fixtures...')
    await Bar.insertMany(bars)
    console.log('Fixtures created')
  } catch (error) {
    console.log('Failed to insert fixtures', error)
  }
}

export default populateDB
