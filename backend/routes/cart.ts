import express from 'express'
import { 
    addUser, 
    clearCart, 
    deleteCart, 
    getAllCart, 
    postCartItems, 
    reomoveExpired, 
    updateCart
 } from '../controller/cartController'
const router = express.Router()

router.get("/",getAllCart)
router.post("/",postCartItems)
router.delete("/",clearCart)
router.delete("/remove-expired",reomoveExpired)
router.delete("/:id",deleteCart)
router.put("/:id",updateCart)
router.put("/user/user-add",addUser)

export default router