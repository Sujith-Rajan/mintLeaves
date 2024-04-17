import express from 'express'
import { getAllProduct, getAllProductByCategory, getProductById, searchProducts } from '../controller/productController'
import { verfyToken } from '../middlewear/verifyToken'
const router = express.Router()

router.get('/id/:id',getProductById) 
router.get('/query/:searchQuery',verfyToken,searchProducts)  
router.get('/:category',getAllProductByCategory)
router.get('/',getAllProduct)

export default router