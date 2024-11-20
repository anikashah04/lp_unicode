import express from 'express'
const router= new express.Router()

import authMiddleware from '../middleware/authentication.js'
import upload from '../utilities/multerConfig.js'
import uploadMiddlware from '../middleware/upload.js'
import resumeMiddleware from '../middleware/resume.js'
import recruiter_controller from '../controllers/recruiter_controller.js'
import recruiterAuthMiddleware from '../middleware/recruiter_auth.js'
import company_controller from'../controllers/company_controller.js'
import user_controller from '../controllers/user_controller.js'
import job_Controller from '../controllers/job_Controller.js'
import application_controller from '../controllers/application_controller.js'
import follower_following_controller from '../controllers/follower_following_controller.js'
import blog_controller from '../controllers/blog_controller.js'

//USER
//Create-Sign up
router.post('/user/signup', user_controller.signup)

//Login
router.post('/user/login', user_controller.login)

//Read
router.get('/user/me', authMiddleware,user_controller.read)

//Update
router.patch('/user/me', authMiddleware,user_controller.update)

//Delete
router.delete('/user/me',authMiddleware, user_controller.deleteUser)

//Upload pfp
router.post('/user/me/avatar', authMiddleware, upload.single('avatar'), uploadMiddlware, user_controller.uploadpfp)

//Update pfp
router.post('/user/me/resume', authMiddleware, upload.single('resume_url'), resumeMiddleware, user_controller.resume)


//RECRUITER
//Sign up for Recruiter
router.post('/recruiter/signup', recruiter_controller.signupR)

//Login in for Recruiter
router.post('/recruiter/login', recruiter_controller.loginR)

//Read Recruiter
router.get('/recruiter/me', recruiterAuthMiddleware, recruiter_controller.readR)

//Delete
router.delete('/recruiter/me',recruiterAuthMiddleware, recruiter_controller.deleteR)

//Accept 
router.patch('/recruiter/accept/:id', recruiterAuthMiddleware,recruiter_controller.accept)

//Reject
router.patch('/recruiter/decline/:id', recruiterAuthMiddleware,recruiter_controller.decline)

//JOB
//Create job listings
router.post('/recruiter/createjoblisting', recruiterAuthMiddleware, job_Controller.createJobListings)

//Read job listings
router.get('/recruiter/readjoblisting', recruiterAuthMiddleware, job_Controller.readJobListings)

//Read (view)applicants
router.get('/recruiter/viewapplicants', recruiterAuthMiddleware, application_controller.viewApplicants)

//COMPANY
//create company profiles
router.post('/company/companyprof',company_controller.CreateCompany)

//read company
router.get('/company/read', company_controller.ReadCompanies)

//Delete company
router.delete('/company/delete/:id', company_controller.DeleteCompany)

//user applies 
router.post('/user/me/apply', authMiddleware, application_controller.apply)

//FOLLOW/UNFOLLOW
//follow 
router.post('/user/me/follow', authMiddleware, follower_following_controller.follow)

//unfollow
router.post('/user/me/unfollow', authMiddleware, follower_following_controller.unfollow)

//view follow/unfollow
router.get('/user/me/view/:_id', authMiddleware, follower_following_controller.view_followers_following)

//BLOGS
//create blogs
router.post('/blog/createblog', blog_controller.createBlog)

//read blogs
router.get('/blog/readblog', blog_controller.readBlogs)

//update blog
router.patch('/blog/updateblog/:_id', blog_controller.updateBlog)

//delete blog
router.delete('/blog/deleteblog/:_id', blog_controller.deleteBlog)

//like blog
router.patch('/blog/like', blog_controller.LikeBlog)

//create 
export default router