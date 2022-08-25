import 'dotenv/config'
import app from './app'
import connectToDB from './config/mongoose'
import logger from './config/logger'

connectToDB()

app.listen(process.env.PORT || 3000, () =>
  logger.info(`App listening on ${process.env.PORT || 3000}`)
)
