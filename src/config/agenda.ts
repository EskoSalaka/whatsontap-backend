import Agenda, { Job } from 'agenda'
import parseOnePintPub from '../crawlers/onepintpub'
import parseUT from '../crawlers/genericUntap'
import parseCaptainCorvus from '../crawlers/captaincorvus'
import parseBlackDoor from '../crawlers/blackdoor'
import parseBierhausBerlin from '../crawlers/biearhausberlin'
import parseBierhausMunchen from '../crawlers/bierhausmunchen'
import { crawl } from '../crawlers/util'
import logger from './logger'

const agenda: Agenda = new Agenda({
  db: { address: process.env.MONGODB_URI, collection: 'agendaJobs' }
})

// Define and schedule all jobs
agenda.define('update bierhaus munchen', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Bierhaus Munchen', parseBierhausMunchen)
  } catch (error) {
    logger.error('error crawling Bierhaus Munchen')
    logger.error(error)
  }
})

agenda.define('update bierhaus berlin', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Bierhaus Berlin', parseBierhausBerlin)
  } catch (error) {
    logger.error('error crawling Bierhaus Berlin')
    logger.error(error)
  }
})

agenda.define('update stadin panimobaari', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Stadin Panimobaari', parseUT)
  } catch (error) {
    logger.error('error crawling Stadin Panimobaari')
    logger.error(error)
  }
})

agenda.define('update barski', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Barski', parseUT)
  } catch (error) {
    logger.error('error crawling Barski')
    logger.error(error)
  }
})

agenda.define('update juova hanahuone', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Juova Hanahuone', parseUT)
  } catch (error) {
    logger.error('error crawling Juova Hanahuone')
    logger.error(error)
  }
})

agenda.define('update gallows bird tapiola', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Gallows Bird Tapiola', parseUT)
  } catch (error) {
    logger.error('error crawling Gallows Bird Tapiola')
    logger.error(error)
  }
})

agenda.define('update one pint pub', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('One pint pub', parseOnePintPub)
  } catch (error) {
    logger.error('error crawling One pint pub')
    logger.error(error)
  }
})

agenda.define('update black door', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Black Door', parseBlackDoor)
  } catch (error) {
    logger.error('error crawling Black Door')
    logger.error(error)
  }
})

agenda.define('update captain corvus', async (job: Job) => {
  logger.info('Running agenda job')

  try {
    await crawl('Captain Corvus', parseCaptainCorvus)
  } catch (error) {
    logger.error('error crawling Captain Corvus')
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
  await agenda.every('11 06,17 * * *', 'update black door', {
    skipImmediate: false
  })
  await agenda.every('17 06,17 * * *', 'update bierhaus berlin', {
    skipImmediate: false
  })
  await agenda.every('21 06,17 * * *', 'update bierhaus munchen', {
    skipImmediate: false
  })
  await agenda.every('23 06,17 * * *', 'update stadin panimobaari', {
    skipImmediate: false
  })
  await agenda.every('27 06,17 * * *', 'update barski', {
    skipImmediate: false
  })
  await agenda.every('30 06,17 * * *', 'update juova hanahuone', {
    skipImmediate: false
  })
  await agenda.every('33 06,17 * * *', 'update gallows bird tapiola', {
    skipImmediate: false
  })

  logger.info('Agenda started')
})()
