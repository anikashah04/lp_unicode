import Blog from '../models/blog_model.js'
import User from '../models/user_model.js'
import Company from '../models/company_model.js'
import Recruiter from '../models/recruiter_model.js'

export const createBlog=async(req,res)=>{
    try{
        const blog=new Blog(req.body)
        await blog.save()
        res.status(201).send(blog)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export const readBlogs=async(req,res)=>{
    try{
        const blogs= await Blog.find().populate('author_id').populate('likes.liked_id')
        res.status(200).send(blogs)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export const updateBlog=async(req,res)=>{
    try{
        const blog= await Blog.findByIdAndUpdate(req.params._id, req.body, {
            new: true // Return the updated document
        })
        await blog.save()
        res.status(200).send(blog)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export const deleteBlog=async(req,res)=>{
    try{
        const blog=await Blog.findByIdAndDelete(req.params._id)
        if (!blog) {
            return res.status(404).send({ message: 'Blog not found.' })
        }
        res.status(200).send({ message: 'Blog deleted successfully.', blog });
        //res.status(200).send(blog)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export const LikeBlog=async(req,res)=>{
    try{
        const { liked_id, blog_id, liked_by } = req.body
        const blog=await Blog.findById(blog_id)
        if(!blog)
            {
                return res.send(404).status('No Blog Found')
            }
        if(liked_by === 'User')
            {
                const user = await User.findById(liked_id)
                if (!user) {
                    return res.status(404).send({ message: 'User not found' })
                }
            }
        else if(liked_by === 'Recruiter'){
            const recruiter = await Recruiter.findById(liked_id)
            console.log(recruiter)
                if (!recruiter) {
                    return res.status(404).send({ message: 'Recruiter not found' })
                }
            }
        else {
             return res.status(404).send({ message: 'Invalid ID' })
        }

        const LikedAlr=blog.likes.find(like=>
            like.liked_id.toString() === liked_id.toString() && like.liked_by === liked_by
        )
        if (LikedAlr) {
            return res.status(400).send({ message: 'You have already liked this blog' })
        }

        blog.likes.push({ liked_id, liked_by })

        blog.likesCount = blog.likesCount + 1

        await blog.save();

        res.status(200).send({
            message: 'Blog liked successfully',
            likesCount: blog.likes.length //counts directly from array
        })
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}


export default{createBlog,readBlogs,updateBlog,deleteBlog,LikeBlog}