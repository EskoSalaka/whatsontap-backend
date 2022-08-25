import express, { Router } from 'express'
import barsRoutes from './bars.routes'
const router: Router = express.Router()

router.use('/bars', barsRoutes)

export default router
