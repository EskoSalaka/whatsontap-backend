import puppeteer from 'puppeteer'
import { IBar } from './models/bar'
import { IBeer } from './models/beer'
;(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
      ]
    })
    const page = await browser.newPage()
    await page.goto('https://www.onepintpub.com/beer-menu', {
      waitUntil: 'networkidle0'
    })

    const frame = page
      .frames()
      .find((frame) => frame.name() === 'htmlComp-iframe')

    // Draft beers are the first tab
    let draftBeersTabContent = await frame.$('div.tab-content')

    let updatedByBarAt = await draftBeersTabContent.$eval(
      'time',
      (el) => el.innerText
    )

    //The draft beers are all inside
    let draftBeersContainer = await draftBeersTabContent.$(
      'div.section-items-container'
    )
    let draftBeers = await draftBeersContainer.$$('.item')

    let beers: IBeer[] = []
    draftBeers.forEach(async (el) => {
      let itemNameContent = await el.$('.item-name')

      let name = await itemNameContent.$eval(
        '.item-title-colors',
        (_) => _.textContent
      )

      let tapNumber = await itemNameContent.$eval(
        'span.tap-number-hideable',
        (_) => _.textContent
      )

      let style = await itemNameContent.$eval(
        'span.item-style',
        (_) => _.textContent
      )
      console.log(name)
      console.log(tapNumber)
      console.log(style)
    })

    await browser.close()
  } catch (error) {
    console.log(error)
  }
})()
