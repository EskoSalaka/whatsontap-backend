import puppeteer from 'puppeteer'
import logger from '../config/logger'
import { IBeer, IBrewery } from '../models/beer'
import { BeerListType, IBeerList } from '../models/beer-list'
import { awaitAll, getImgSrc, getTextContent, getHref } from './util'

let parsePage = async (
  page: puppeteer.Page
): Promise<Omit<IBeerList, 'bar'>> => {
  let draftList: Omit<IBeerList, 'bar'> = {
    type: BeerListType.DRAFT,
    beers: []
  }

  let draftBeerHandles = []
  let draftBeerLists = (await page.$$('ul.menu-section-list')).flat()
  for (const draftBeerList of draftBeerLists) {
    draftBeerHandles.push(await draftBeerList.$$('div.beer-info'))
  }

  draftList.beers = await awaitAll(draftBeerHandles.flat(), getBeer)

  return draftList
}

// Returns the Beer object from an element handle containing the required nodes
let getBeer = async (el: puppeteer.ElementHandle<Element>): Promise<IBeer> => {
  let detailsContent = await el.$('.beer-details')
  let secondaryLineContent = await detailsContent.$('span')

  let beer: IBeer = {
    name: (await detailsContent.$eval('a.track-click', (_) => _.textContent))
      .replace(/^[^.]+\./, '')
      .trim()
  }

  if (!beer.name) throw new Error('No Beer name available')

  try {
    let beerInfo = (await getTextContent(el, 'span')).split('•')

    if (beerInfo && beerInfo.length > 0) beer.abv = beerInfo[0].trim()
    if (beerInfo && beerInfo.length > 1 && !beerInfo[1].includes('N/A')) {
      beer.ibu = beerInfo[1].trim()
    }
  } catch (error) {
    logger.error('Unable to beer ABV/IBU' + beer.name)
    logger.error(error)
  }

  beer.style = await getTextContent(el, 'em')
  beer.untappdIconUrl = await getImgSrc(el, 'img')

  try {
    let brewery: IBrewery = {
      name: (await getTextContent(secondaryLineContent, 'a')).trim()
    }

    if (!brewery.name) throw new Error('No Brewery name available')
    brewery.untappdUrl = await getHref(secondaryLineContent, 'a')

    beer.brewery = brewery

    console.log(beer)
  } catch (error) {
    logger.error('Unable to read the brewery of beer ' + beer.name)
    logger.error(error)
  }

  return beer
}

export default parsePage
