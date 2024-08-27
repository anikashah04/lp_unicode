const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    }
})

const User=new mongoose.model('User', userSchema)

module.exports=User