import express from 'express'
const router= new express.Router()

import recruiterAuthMiddleware from '../middleware/recruiter_auth.js'
import job_Controller from '../controllers/job_controller.js'
import application_controller from '../controllers/application_controller.js'

//JOB
//Create job listings
router.post('/createjoblisting', recruiterAuthMiddleware, job_Controller.createJobListings)

//Read job listings
router.get('/readjoblisting', recruiterAuthMiddleware, job_Controller.readJobListings)

//Read (view)applicants
router.get('/viewapplicants', recruiterAuthMiddleware, application_controller.viewApplicants)

export default router