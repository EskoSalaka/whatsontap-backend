import { NextFunction, Request, Response } from 'express'
import Bar from '../models/bar'

let listAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBars = await Bar.find() // Currently no need for pagination

    res.status(200).json(allBars)
  } catch (error) {
    next(error)
  }
}

export default { listAll }
