import express from "express"
import { createFeedback, getAllFeedback } from "../controller/feedbackController"
import { verfyToken } from "../middlewear/verifyToken"

const router =  express.Router()

router.post("/",verfyToken,createFeedback)
router.get("/all-feedbacks",getAllFeedback)

export default router