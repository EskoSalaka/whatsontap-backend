import mongoose from 'mongoose'
import BeerList, { IBeerList } from './beer-list'

export interface IBar {
  name: string
  address?: string
  googlePlusCode: String
  googleMapsLink: string
  phoneNumber?: String
  latestBeerLists: IBeerList[]
  url: string
  crawlUrl: string
}

const barSchema = new mongoose.Schema<IBar>(
  {
    name: {
      type: String,
      required: true
    },
    address: String,
    googlePlusCode: String,
    googleMapsLink: String,
    phoneNumber: String,
    url: String,
    crawlUrl: String,
    latestBeerLists: [BeerList.schema] // Contains only the latest beer lists of each type (not refs)
  },
  {
    timestamps: true
  }
)

const Bar = mongoose.model<IBar>('Bar', barSchema)

export default Bar
