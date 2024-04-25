import express from 'express'
import { createOrder, getAllOrders, verifyPayment } from '../controller/orderController'
import { verfyToken } from '../middlewear/verifyToken'

const router = express.Router()

router.post("/",verfyToken,createOrder)
router.post("/verify_pymnt",verfyToken,verifyPayment)
router.get("/all_orders_user/:id",verfyToken,getAllOrders)

export default router