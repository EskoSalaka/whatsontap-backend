import mongoose, { Schema } from 'mongoose'
import { IBar } from './bar'
import Beer, { IBeer } from './beer'

export enum BeerListType {
  DRAFT = 'DRAFT',
  BOTTLE = 'BOTTLE',
  TAKEAWAY = 'TAKEAWAY'
}

export interface IBeerList {
  bar: IBar
  type: BeerListType
  beers: IBeer[]
  updatedByBarAt?: string
  updatedByBarAtDt?: Date
}

const beerListSchema = new mongoose.Schema<IBeerList>(
  {
    bar: { type: Schema.Types.ObjectId, ref: 'Bar' },
    type: {
      type: String,
      enum: BeerListType,
      required: true,
      default: BeerListType.DRAFT
    },
    beers: [Beer.schema], // Currently beers only appear in these lists, not in their won collection,
    updatedByBarAt: String,
    updatedByBarAtDt: Date
  },
  {
    timestamps: true
  }
)

const BeerList = mongoose.model<IBeerList>('BeerList', beerListSchema)

export default BeerList
