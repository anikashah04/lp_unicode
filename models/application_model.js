import mongoose from 'mongoose'
import User from './user_model'
import Job from './job_model'

const applicationSchema=({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    job_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job',
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    applied_date:{
        type:Date,
        required:true
    }
})

const Application=new mongoose.model('Application', applicationSchema)

export default Application