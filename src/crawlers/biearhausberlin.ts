import puppeteer from 'puppeteer'
import logger from '../config/logger'
import { IBeer, IBrewery } from '../models/beer'
import { BeerListType, IBeerList } from '../models/beer-list'
import { awaitAll, getImgSrc, getTextContent } from './util'

let parsePage = async (
  page: puppeteer.Page
): Promise<Omit<IBeerList, 'bar'>> => {
  let draftList: Omit<IBeerList, 'bar'> = {
    type: BeerListType.DRAFT,
    beers: []
  }

  // First need to click on the first link to show tap beers
  await (await page.$('a')).click()

  let draftBeerHandles = await page.$$('div.untappd-item')
  draftList.beers = await awaitAll(draftBeerHandles, getBeer)

  return draftList
}

// Returns the Beer object from an element handle containing the required nodes
let getBeer = async (el: puppeteer.ElementHandle<Element>): Promise<IBeer> => {
  let beer: IBeer = {
    name: (await el.$eval('.item-name', (_) => _.textContent))
      .replace(/^[^.]+\./, '')
      .trim()
  }

  if (!beer.name) throw new Error('No Beer name available')

  beer.untappdIconUrl = await getImgSrc(el, 'img')
  beer.style = await getTextContent(el, 'span.item-category')
  beer.abv = await getTextContent(el, 'span.item-abv')

  try {
    let brewery: IBrewery = {
      name: (await getTextContent(el, 'span.item-producer')).trim()
    }
    brewery.location = await getTextContent(el, 'span.item-from')

    if (!brewery.name) throw new Error('No Brewery name available')

    beer.brewery = brewery
  } catch (error) {
    logger.error('Unable to read the brewery of beer ' + beer.name)
    logger.error(error)
  }

  return beer
}

export default parsePage
