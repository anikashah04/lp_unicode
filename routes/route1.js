import express from 'express'
const router= new express.Router()
import controller from '../controllers/controller1.js'
import authMiddleware from '../middleware/authentication.js'

//Create-Sign up

router.post('/user/signup',controller.signup)

//Login
router.post('/user/login', controller.login)

//Read

router.get('/user/me', authMiddleware,controller.read)

//Update

router.patch('/user/me', authMiddleware,controller.update)

//Delete

router.delete('/user/me',authMiddleware, controller.deleteUser)

export default router