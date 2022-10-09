import mongoose from 'mongoose'

export interface IBrewery {
  name: string
  location?: string
  untappdUrl?: string
}

export interface IBeer {
  name: string
  brewery?: IBrewery
  style?: string
  description?: string
  abv?: string
  ibu?: string
  tapNumber?: number
  untappdUrl?: string
  untappdIconUrl?: string
}

const brewerySchema = new mongoose.Schema<IBrewery>(
  {
    name: {
      type: String,
      required: true
    },
    location: String,
    untappdUrl: String
  },

  {
    timestamps: true
  }
)

const beerSchema = new mongoose.Schema<IBeer>(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    style: String,
    abv: String,
    ibu: String,
    tapNumber: Number,
    brewery: brewerySchema,
    untappdUrl: String,
    untappdIconUrl: String
  },

  {
    timestamps: true
  }
)

const Beer = mongoose.model<IBeer>('Beer', beerSchema)

export default Beer
