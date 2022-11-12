import puppeteer from 'puppeteer'
import logger from '../config/logger'
import { IBeer, IBrewery } from '../models/beer'
import { BeerListType, IBeerList } from '../models/beer-list'
import { awaitAll, getHref, getImgSrc, getTextContent } from './util'

let parsePage = async (
  page: puppeteer.Page
): Promise<Omit<IBeerList, 'bar'>> => {
  // For now, just crawl for the draft beers
  let draftList: Omit<IBeerList, 'bar'> = {
    type: BeerListType.DRAFT,
    beers: []
  }

  // Updated at is the first date-time div
  let updatedAtContainer = await page.$('div.date-time')
  draftList.updatedByBarAt = await getTextContent(updatedAtContainer, 'time')

  let updatedByBarAtDt = new Date(draftList.updatedByBarAt)
  if (updatedByBarAtDt instanceof Date && !isNaN(updatedByBarAtDt.valueOf())) {
    draftList.updatedByBarAtDt = updatedByBarAtDt
  }

  // Draft beers are the first tab in the meni item container
  let draftBeersTabContent = await page.$('div.menu-items-container')
  let draftBeerHandles = await draftBeersTabContent.$$('.item')
  draftList.beers = await awaitAll(draftBeerHandles, getBeer)

  console.log(draftList)
  return draftList
}

// Returns the Beer object from an element handle containing the required nodes
let getBeer = async (el: puppeteer.ElementHandle<Element>): Promise<IBeer> => {
  let nameContent = await el.$('.item-name')
  let detailsContent = await el.$('.item-meta')
  let descriptionContent = await el.$('.item-description')
  let labelContent = await el.$('.item-label')
  let breweryContent = await el.$('span.brewery')

  // The name is mandatory, function throws an error on case name cant be extracted
  let beer: IBeer = {
    name: (await nameContent.$eval('.item-title-color', (_) => _.textContent))
      .replace(/^[^.]+\./, '')
      .trim()
  }

  // The rest are optional, doesnt matter if they stay null in case something fails
  beer.untappdUrl = await getHref(labelContent, 'a')
  beer.untappdIconUrl = await getImgSrc(labelContent, 'img')
  beer.tapNumber = Number(
    await getTextContent(nameContent, 'span.tap-number-hideable')
  )
  beer.style = await getTextContent(nameContent, 'span.item-style')
  beer.ibu = await getTextContent(detailsContent, 'span.ibu')
  beer.abv = await getTextContent(detailsContent, 'span.abv')
  beer.description = await getTextContent(descriptionContent, 'p.show-less')

  try {
    let brewery: IBrewery = {
      name: (
        await breweryContent.$eval('.item-title-color', (_) => _.textContent)
      ).trim()
    }
    brewery.untappdUrl = await getHref(breweryContent, '.item-title-color')

    beer.brewery = brewery

    console.log(brewery)
  } catch (error) {
    logger.error('Unable to read the brewery of beer ' + beer.name)
    logger.error(error)
  }

  return beer
}

export default parsePage
