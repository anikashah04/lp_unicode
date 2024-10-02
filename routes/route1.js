import express from 'express'
const router= new express.Router()
import controller from '../controllers/controller1.js'
import authMiddleware from '../middleware/authentication.js'
import upload from '../utilities/multerConfig.js'
import uploadMiddlware from '../middleware/upload.js'
import resumeMiddleware from '../middleware/resume.js'

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

//Upload pfp

router.post('/user/me/avatar', authMiddleware, upload.single('avatar'), uploadMiddlware,controller.uploadpfp)

//Update pfp

router.post('/user/me/resume', authMiddleware, upload.single('resume_url'), resumeMiddleware, controller.resume)

//create company profiles
router.post('/user/createcompanyprof',authMiddleware, controller.createCompanyProfile)

export default router