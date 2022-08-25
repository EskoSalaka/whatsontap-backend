import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import expressStatusMonitor from 'express-status-monitor'
import errorMiddleware from 'error-middleware'
import routes from './routes/v1'
import morganMiddleware from './config/morgan'
import logger from './config/logger'
import './config/agenda'

const app = express()

app.use(morganMiddleware)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressStatusMonitor())

app.use('/api/v1', routes)

app.use((error, req, res, next) => {
  logger.error(error)
  logger.error(error.stack)
  next(error)
})
app.use(errorMiddleware)

export default app
