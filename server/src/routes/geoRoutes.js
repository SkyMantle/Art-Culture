// routes/geoRoutes.js
import express from "express"
import { searchAddress } from "../controllers/geoController.js"

const router = express.Router()

// GET /api/geo?q=YourSearchQuery
router.get("/", searchAddress)

export default router
