
const User= require('../models/model1')
const nodemailer=require('nodemailer')

//Create-Signup

exports.signup= async(req,res)=>{
    
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
exports.login=async(req,res)=>{
    try{
        const user= await User.authenticate(req.body.email, req.body.password)
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

exports.read= async(req,res)=>{
    try{
        res.send(req.user)
    }catch(error){
        res.send(error)
    }
}

//Update

exports.update= async(req,res)=>{
    try{
        const user= await User.findByIdAndUpdate(req.user.id,req.body,{new:true})
        res.status(200).send(user)
        console.log(user)
        //res.send(user).status(200)
    }catch(error){
        res.send(error)
    }
}

//Delete

exports.delete= async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.user._id)
        res.status(200).send(req.user)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

