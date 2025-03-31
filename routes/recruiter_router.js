import express from 'express'
const router= new express.Router()

import recruiter_controller from '../controllers/recruiter_controller.js'
import recruiterAuthMiddleware from '../middleware/recruiter_auth.js'

//RECRUITER
//Sign up for Recruiter
router.post('/signup', recruiter_controller.signupR)

//Login in for Recruiter
router.post('/login', recruiter_controller.loginR)

//Read Recruiter
router.get('/me', recruiterAuthMiddleware, recruiter_controller.readR)

//Delete
router.delete('/me',recruiterAuthMiddleware, recruiter_controller.deleteR)

//Accept 
router.patch('/accept/:id', recruiterAuthMiddleware,recruiter_controller.accept)

//Reject
router.patch('/decline/:id', recruiterAuthMiddleware,recruiter_controller.decline)

export default router