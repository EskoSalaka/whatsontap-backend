import { awaitAll, getHref, getTextContent } from './util'
import logger from '../config/logger'
import puppeteer from 'puppeteer'
import { BeerListType, IBeerList } from '../models/beer-list'
import { IBrewery } from '../models/beer'
import _ from 'lodash'
import { IBeer } from '../models/beer'

let parsePage = async (
  page: puppeteer.Page
): Promise<Omit<IBeerList, 'bar'>> => {
  // For now, just crawl for the draft beers
  let draftList: Omit<IBeerList, 'bar'> = {
    type: BeerListType.DRAFT,
    beers: []
  }

  // Draft beers are the fourth ul of the page
  let draftElementList = (await page.$$('ul'))[3]
  let draftBeerHandles = await draftElementList.$$('li')
  draftList.beers = await awaitAll(draftBeerHandles, getBeer)

  return draftList
}

// Returns the Beer object from an element handle containing the required nodes
let getBeer = async (el: puppeteer.ElementHandle<Element>): Promise<IBeer> => {
  let brewery: IBrewery = {
    name: await getTextContent(el, 'a'),
    url: await getHref(el, 'a')
  }

  let beerTextLine = (await el.evaluate((_) => _.textContent))
    .split('–')[1]
    .trim()

  let abv: string

  try {
    abv = beerTextLine.match(/[-+]?\d+(\,\d+)/)[0]
  } catch (error) {
    logger.error('No abv found')
  }

  let beer: IBeer = {
    name: beerTextLine.replace(abv, '').replace('%', '').trim()
  }

  if (brewery.name) {
    beer.brewery = brewery
  }

  if (abv) {
    beer.abv = abv + '% ABV'
  }

  return beer
}

export default parsePage
