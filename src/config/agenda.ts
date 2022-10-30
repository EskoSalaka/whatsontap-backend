import Agenda, { Job } from 'agenda'
import parseOnePintPub from '../crawlers/onepintpub'
import parseCaptainCorvus from '../crawlers/captaincorvus'
import { crawl } from '../crawlers/util'
import logger from './logger'

const agenda: Agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: 'agendaJobs' }
})

// Define and schedule all jobs
agenda.define('update one pint pub', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('One pint pub', parseOnePintPub)
  } catch (error) {
    logger.error(error)
  }
})

agenda.define('update captain corvus', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Captain Corvus', parseCaptainCorvus)
  } catch (error) {
    logger.error(error)
  }
})
;(async function () {
  await agenda.start()
  await agenda.every('00 06,17 * * *', 'update one pint pub', {
    skipImmediate: false
  })
  await agenda.every('05 06,17 * * *', 'update captain corvus', {
    skipImmediate: false
  })

  logger.info('Agenda started')
})()
