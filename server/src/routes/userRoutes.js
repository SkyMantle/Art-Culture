// src/routes/userRoutes.js

import express from "express"
import {
  getAuthorById,
  getAuthors,
  getAuthorsByLanguage,
  getCreatorById,
  getCreators,
  getCreatorsByLanguage,
  getMuseumById,
  getMuseums,
} from "../controllers/userController.js"

const router = express.Router()

router.get("/authors/language/:language", getAuthorsByLanguage)
router.get("/creators/language/:language", getCreatorsByLanguage)
router.get("/authors", getAuthors)
router.get("/authors/:id", getAuthorById)
router.get("/creators/:id", getCreatorById)
router.get("/creators", getCreators)
router.get("/museums/:id", getMuseumById)
router.get("/museums", getMuseums)

export default router
