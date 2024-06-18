import express from 'express'
import authenticate from '../middlewares/auth.middleware.js'
import { validateBookRegistration } from '../validators/book.validator.js'
import { getBooks, registerBook } from '../controllers/book.controller.js'

const router = express.Router()

router.get("/", authenticate, getBooks)

router.post("/register",authenticate, validateBookRegistration ,registerBook)

export default router;