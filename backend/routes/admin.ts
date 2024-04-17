import express from 'express'
import { createProduct, deleteProduct, readProduct, updateProduct,readProductById } from '../controller/adminProductController'
import { deleteUser, readUser, readUserById } from '../controller/adminUserController'

const router = express.Router()

router.post("/product",createProduct)
router.get("/product",readProduct)
router.get("/product/:id",readProductById)
router.delete("/product/:id",deleteProduct)
router.put("/product",updateProduct)


router.get("/user",readUser)
router.get("/user/:id",readUserById)
router.delete("/user/:id",deleteUser)
router.put("/user",updateProduct)


export default router