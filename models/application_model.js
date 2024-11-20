import mongoose from 'mongoose'
import User from './user_model.js'
import Job from './job_model.js'

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
    recruiter_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recruiter'
    },
    status:{
        type:String,
        enum:['Pending', 'Accepted', 'Declined'],
        default:'Pending',
    },
    applied_date:{
        type:Date,
        required:true
    }
})

const Application=new mongoose.model('Application', applicationSchema)

export default Application