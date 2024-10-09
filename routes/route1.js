import express from 'express'
const router= new express.Router()
import controller from '../controllers/controller1.js'
import authMiddleware from '../middleware/authentication.js'
import upload from '../utilities/multerConfig.js'
import uploadMiddlware from '../middleware/upload.js'
import resumeMiddleware from '../middleware/resume.js'
import controller2 from '../controllers/controller2.js'
import recruiterAuthMiddleware from '../middleware/recruiter_auth.js'

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

//Sign up for Recruiter
router.post('/recruiter/signup', controller2.signupR)

//Login in for Recruiter
router.post('/recruiter/login', controller2.loginR)

//create company profiles
router.post('/companyprof', controller2.companyR)

//read company
router.get('/companies/read', controller2.ReadCompanies)

//Delete company
router.delete('/company/delete/:id', controller2.DeleteCompany)

//Read Recruiter
router.get('/recruiter/me', recruiterAuthMiddleware, controller2.readR)

//Delete
router.delete('/recruiter/me',recruiterAuthMiddleware, controller2.deleteR)

//create 
export default router