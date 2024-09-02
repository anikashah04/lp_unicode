const express=require('express')
const router= new express.Router()
const controller= require('../controllers/controller1')
const authMiddleware = require('../middleware/authentication')

//Create-Sign up

router.post('/user/signup',controller.signup)

//Login
router.post('/user/login', controller.login)

//Read

router.get('/user/me', authMiddleware,controller.read)

//Update

router.patch('/user/me', authMiddleware,controller.update)

//Delete

router.delete('/user/me',authMiddleware, controller.delete)

module.exports=router