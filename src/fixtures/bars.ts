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
    crawlUrl: 'https://www.onepintpub.com/beer-menu'
  },
  {
    name: 'Captain Corvus',
    address: 'Suomenlahdentie 1, 02230 Espoo',
    googlePlusCode: '5P6Q+73 Espoo',
    phoneNumber: '+358504441272',
    latestBeerLists: [],
    url: 'http://www.captaincorvus.fi/',
    googleMapsLink: 'https://goo.gl/maps/Agd1tkwEUtjtVPSg8',
    crawlUrl: 'http://www.captaincorvus.fi/valikoima/'
  }
]

export default bars
