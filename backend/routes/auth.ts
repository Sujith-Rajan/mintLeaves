import express from 'express'
import { creatUser, googleAuth, googleCallback, loginSuccess, loginUser, logout } from '../controller/authController'
import { verfyToken } from '../middlewear/verifyToken'



const router = express.Router()

router.post('/register',creatUser) 
router.post('/login',loginUser) 
router.get('/google',googleAuth)
router.get('/google/callback',googleCallback)
router.get('/login/success',loginSuccess)
router.get("/logout",verfyToken,logout)


export default router