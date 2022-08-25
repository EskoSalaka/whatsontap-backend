import express, { Router } from 'express'
import barsControllers from '../../controllers/bars.controller'

const router: Router = express.Router()

router.get('/', barsControllers.listAll) // List all

export default router
