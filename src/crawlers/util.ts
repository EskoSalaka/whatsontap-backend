import { ElementHandle } from 'puppeteer'
import logger from '../config/logger'
import { IBar } from '../models/bar'
import puppeteer from 'puppeteer'
import Bar from '../models/bar'
import BeerList, { BeerListType, IBeerList } from '../models/beer-list'
import _ from 'lodash'

// Returns text content of an element handle with leading/trailing spaces
// and newlines removed or logs the error and returns null
export const getTextContent = async (
  el: ElementHandle<Element>,
  selector: string
) => {
  try {
    return (await el.$eval(selector, (_) => _.textContent))
      .replaceAll('\n', '')
      .trim()
  } catch (error: any) {}

  return null
}

// Returns href of a link handle or logs the error and returns null
export const getHref = async (el: ElementHandle<Element>, selector: string) => {
  try {
    return await el.$eval(selector, (_) => (_ as HTMLLinkElement).href)
  } catch (error: any) {}

  return null
}

// Returns src of an img handle or logs the error and returns null
export const getImgSrc = async (
  el: ElementHandle<Element>,
  selector: string
) => {
  try {
    return await el.$eval(selector, (_) => (_ as HTMLImageElement).src)
  } catch (error: any) {}

  return null
}

export const awaitAll = async (list, asyncFn) => {
  const promises = []

  list.forEach((_: any) => {
    promises.push(asyncFn(_))
  })

  let results = await Promise.all(
    promises.map((p) =>
      p.catch((err: Error) => {
        logger.error('Something went wrong with promise in a list')
        logger.error(err.message)

        return err
      })
    )
  )

  return results.filter((result) => !(result instanceof Error))
}

export const crawl = async (barName: IBar['name'], parser: Function) => {
  let barDoc = await Bar.findOne({ name: barName })
  logger.info(`Crawling ${barDoc.name} beers`)

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  })
  const page = await browser.newPage()
  await page.goto(barDoc.crawlUrl, {
    waitUntil: 'networkidle0'
  })

  let draftList: IBeerList = await parser(page)
  logger.info(`Beer list from ${barDoc.name} crawled`)
  logger.info(JSON.stringify(draftList, null, 4))

  // Save a new list only if theres something new in the one we just crawled
  let latestDraftList: IBeerList | undefined = barDoc.latestBeerLists.find(
    (beerList) => beerList.type === 'DRAFT'
  )

  if (
    !latestDraftList ||
    !_.isEqual(
      latestDraftList.beers.map((beer) => beer.name).sort(),
      draftList.beers.map((beer) => beer.name).sort()
    )
  ) {
    let newDraftList = await BeerList.create({
      ...draftList,
      bar: barDoc._id
    })

    // Sync the latest draft list at the bar document
    barDoc.latestBeerLists = [newDraftList]
    await barDoc.save()
    await browser.close()
  } else {
    logger.info(`No new beers at ${barDoc.name}`)
  }
}
