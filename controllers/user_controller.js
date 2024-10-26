
import User from '../models/user_model.js'
import nodemailer from 'nodemailer'
import Application from '../models/application_model.js'

//Create-Signup

export const signup= async(req,res)=>{
    
    const user=new User(req.body)
    console.log(req.body.email)
    try{
        await user.save()
        const token=await user.generateAuthToken()
        let mailTransporter= nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        let details={
            from:"anikaunicodetask@gmail.com",
            to:req.body.email,
            subject:"Sign Up",
            text:"Successfully Signed In"
        }
        mailTransporter.sendMail(details, (error)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log('Email has been sent')
            }
        })
        res.status(201).send({user,token})
    }
    catch(error){
        res.status(400).send(error)
    }
}

//Login
export const login=async(req,res)=>{
    try{
        const user= await User.authenticate(req.body.email, req.body.password)
        const token=await user.generateAuthToken()
        console.log(token)
        let mailTransporter= nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASSWORD
            }
        })
        let details={
            from:"anikaunicodetask@gmail.com",
            to:req.body.email,
            subject:"Logged In",
            text:"Successfully Logged In"
        }
        mailTransporter.sendMail(details, (error)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log('Email has been sent')
            }
        })
        res.status(200).send({user: user,token})
    }
    catch(error)
    {
        res.status(400).send({error: error.message})
    }
}

//Read

export const read= async(req,res)=>{
    try{
        res.send(req.user)
    }catch(error){
        res.send(error)
    }
}

//Update

export const update= async(req,res)=>{
    try{
        const user= await User.findByIdAndUpdate(req.user.id,req.body,{new:true})
        res.status(200).send(user)
    }catch(error){
        res.send(error)
    }
}

//Delete

export const deleteUser= async(req,res)=>{
    try{
        
        console.log("Public ID for avatar:", req.user.avatarPublicId);
        if(req.user.avatarPublicId){

            console.log("Avatar deletion result:")
            await cloudinary.uploader.destroy(req.user.avatarPublicId, function(result){
                console.log(result)
            })
            req.user.avatar=null
        }
        if(req.user.resumePublicId){
            await cloudinary.uploader.destroy(req.user.resumePublicId, function(result){
                console.log(result)
            })
            req.user.resume_url=null
        }
        await req.user.save()
        await User.findByIdAndDelete(req.user._id)
        res.status(200).send(req.user)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

//Profile picture

import cloudinary from '../utilities/cloudinaryConfig.js'
import Company from '../models/company_model.js'
export const uploadpfp= async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).status({message:'No file uploaded'})
        }
        const imgURL=req.file.path
        const publicId=req.file.filename
        console.log(publicId)
        req.user.avatar=imgURL
        req.user.avatarPublicId=publicId

        await req.user.save()
        res.status(200).send({url:imgURL})
    }catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}


//upload resume

export const resume=async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).status({message:'No file uploaded'})
        }
        const resumeURL=req.file.path
        const publicId=req.file.filename
        console.log(publicId)
        req.user.resume_url=resumeURL
        req.user.resumePublicId=publicId
        await req.user.save()
        res.status(200).send({url:resumeURL})
    }catch(error){
        res.status(404).send(error)
    }
}

export const apply=async(req,res)=>{
    try{
       const application=new Application({
        user_id:req.user.user_id,
        ...req.body
       }) 
       await application.save()
       res.status(201).send(application)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}



export default { signup, login, read, update, deleteUser, uploadpfp, resume, apply}
