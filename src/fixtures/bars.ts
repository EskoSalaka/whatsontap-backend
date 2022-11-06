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
  }
]

export default bars
