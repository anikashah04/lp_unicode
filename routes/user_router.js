import express from 'express'
const router= new express.Router()

import authMiddleware from '../middleware/authentication.js'
import upload from '../utilities/multerConfig.js'
import uploadMiddlware from '../middleware/upload.js'
import resumeMiddleware from '../middleware/resume.js'
import user_controller from '../controllers/user_controller.js'
import follower_following_controller from '../controllers/follower_following_controller.js'
import application_controller from '../controllers/application_controller.js'

//USER
//Create-Sign up
router.post('/signup', user_controller.signup)

//Login
router.post('/login', user_controller.login)

//Read
router.get('/me', authMiddleware,user_controller.read)

//Update
router.patch('/me', authMiddleware,user_controller.update)

//Delete
router.delete('/me',authMiddleware, user_controller.deleteUser)

//Upload pfp
router.post('/me/avatar', authMiddleware, upload.single('avatar'), uploadMiddlware, user_controller.uploadpfp)

//Update pfp
router.post('/me/resume', authMiddleware, upload.single('resume_url'), resumeMiddleware, user_controller.resume)

//FOLLOW/UNFOLLOW
//follow 
router.post('/me/follow', authMiddleware, follower_following_controller.follow)

//unfollow
router.post('/me/unfollow', authMiddleware, follower_following_controller.unfollow)

//view follow/unfollow
router.get('/me/view/:_id', authMiddleware, follower_following_controller.view_followers_following)

//user applies 
router.post('/me/apply', authMiddleware, application_controller.apply)

export default router