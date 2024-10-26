import express from 'express'
const router= new express.Router()
import User_controller from '../controllers/user_controller.js'
import authMiddleware from '../middleware/authentication.js'
import upload from '../utilities/multerConfig.js'
import uploadMiddlware from '../middleware/upload.js'
import resumeMiddleware from '../middleware/resume.js'
import Recruiter_controller from '../controllers/recruiter_controller.js'
import recruiterAuthMiddleware from '../middleware/recruiter_auth.js'
import Company_controller from'../controllers/company_controller.js'
import user_controller from '../controllers/user_controller.js'

//Create-Sign up
router.post('/user/signup', User_controller.signup)

//Login
router.post('/user/login', User_controller.login)

//Read
router.get('/user/me', authMiddleware,User_controller.read)

//Update
router.patch('/user/me', authMiddleware,User_controller.update)

//Delete
router.delete('/user/me',authMiddleware, User_controller.deleteUser)

//Upload pfp
router.post('/user/me/avatar', authMiddleware, upload.single('avatar'), uploadMiddlware, User_controller.uploadpfp)

//Update pfp
router.post('/user/me/resume', authMiddleware, upload.single('resume_url'), resumeMiddleware, User_controller.resume)

//Sign up for Recruiter
router.post('/recruiter/signup', Recruiter_controller.signupR)

//Login in for Recruiter
router.post('/recruiter/login', Recruiter_controller.loginR)

//Read Recruiter
router.get('/recruiter/me', recruiterAuthMiddleware, Recruiter_controller.readR)

//Delete
router.delete('/recruiter/me',recruiterAuthMiddleware, Recruiter_controller.deleteR)

//Create job listings
router.post('/recruiter/createjoblisting', recruiterAuthMiddleware, Recruiter_controller.createJobListings)

//Read job listings
router.get('/recruiter/readjoblisting', recruiterAuthMiddleware, Recruiter_controller.readJobListings)

//Read (view)applicants
router.get('/recruiter/viewapplicants', recruiterAuthMiddleware, Recruiter_controller.viewApplicants)

//create company profiles
router.post('/companyprof',Company_controller.CreateCompany)

//read company
router.get('/companies/read', Company_controller.ReadCompanies)

//Delete company
router.delete('/company/delete/:id', Company_controller.DeleteCompany)

//user applies 
router.post('/user/me/apply', authMiddleware, user_controller.apply)

//create 
export default router