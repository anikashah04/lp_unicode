import Blog from '../models/blog_model.js'
import User from '../models/user_model.js'
import Company from '../models/company_model.js'

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
        const blogs= await Blog.find()
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

export default{createBlog,readBlogs,updateBlog,deleteBlog}