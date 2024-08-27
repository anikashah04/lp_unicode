
const User= require('../models/model1')

//Create

exports.create= async(req,res)=>{
    try{
        const user=new User(req.body)
        await user.save()
        res.send(user).status(200)
    }
    catch(error){
        res.send(error).status(400)
    }
}

//Read

exports.read= async(req,res)=>{
    try{
        const users=await User.find({})
        res.send(users).status(200)
    }catch(error){
        res.status(500).send(error)
    }
}

//Update

exports.update= async(req,res)=>{
    try{
        const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        //console.log(user)
        res.send(user).status(200)
    }catch(error){
        res.send(error).status(400)
    }
}

//Delete

exports.delete= async(req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        res.send(user).status(200)
    }catch(error){
        res.send(error).send(error)
    }
}
