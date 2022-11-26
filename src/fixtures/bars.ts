import { IBar } from '../models/bar'

let bars: IBar[] = [
  {
    name: 'One pint pub',
    address: 'Sinikaislankuja 2, 00180 Helsinki',
    googlePlusCode: '5W6C+R3 Helsinki',
    phoneNumber: '+35895626101',
    latestBeerLists: [],
    url: 'https://www.onepintpub.com/',
    googleMapsLink: 'https://g.page/onepintpub?share',
    crawlUrl: 'https://www.onepintpub.com/beer-menu',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Captain Corvus',
    address: 'Suomenlahdentie 1, 02230 Espoo',
    googlePlusCode: '5P6Q+73 Espoo',
    phoneNumber: '+358504441272',
    latestBeerLists: [],
    url: 'http://www.captaincorvus.fi/',
    googleMapsLink: 'https://goo.gl/maps/Agd1tkwEUtjtVPSg8',
    crawlUrl: 'http://www.captaincorvus.fi/valikoima/',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Black Door',
    address: 'Iso Roobertinkatu 1, 00120 Helsinki',
    googlePlusCode: '5W7V+MF Helsinki',
    phoneNumber: '+358 504064614',
    latestBeerLists: [],
    url: 'https://blackdoor.fi',
    googleMapsLink: 'https://goo.gl/maps/KHu7cruuCZVuJUuG6',
    crawlUrl: 'https://blackdoor.fi/#beer',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Bierhaus Munchen',
    address: 'Töölönlahdenkatu 3 B, 00101 Helsinki',
    googlePlusCode: '5WFQ+6Q Helsinki',
    phoneNumber: '+358 451381635',
    latestBeerLists: [],
    url: 'https://bierhaus.fi/',
    googleMapsLink: 'https://g.page/BierhausMunchen?share',
    crawlUrl: 'https://bierhaus-munchen.listantai.fi/',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Bierhaus Berlin',
    address: 'Firdonkatu 2, 00520 Helsinki',
    googlePlusCode: '5WXH+4H Helsinki',
    phoneNumber: '+358 401646819',
    latestBeerLists: [],
    url: 'https://bierhaus.fi/',
    googleMapsLink: 'https://g.page/BierhausTripla?share',
    crawlUrl: 'https://bierhaus-berlin.listantai.fi/',
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export default bars
