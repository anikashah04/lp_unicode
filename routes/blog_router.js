import express from 'express'
const router= new express.Router()

import blog_controller from '../controllers/blog_controller.js'

//BLOGS
//create blogs
router.post('/createblog', blog_controller.createBlog)

//read blogs
router.get('/readblog', blog_controller.readBlogs)

//update blog
router.patch('/updateblog/:_id', blog_controller.updateBlog)

//delete blog
router.delete('/deleteblog/:_id', blog_controller.deleteBlog)

//like blog
router.patch('/like', blog_controller.LikeBlog)

export default router