import Agenda, { Job } from 'agenda'
import crawlOnePintPub from '../crawlers/onepintpub'
import logger from './logger'

const agenda: Agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: 'agendaJobs' }
})

// Define and schedule all jobs
agenda.define('update one pint pub', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawlOnePintPub()
  } catch (error) {
    logger.error(error)
  }
  
})
;(async function () {
  await agenda.start()
  await agenda.every('00 06,17 * * *', 'update one pint pub', {
    skipImmediate: false
  })

  logger.info('Agenda started')
})()
