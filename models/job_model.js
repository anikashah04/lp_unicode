import mongoose from 'mongoose'
import Recruiter from './recruiter_model.js'
import Company from './company_model.js'

const jobSchema=({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:[String],
        required:true
    },
    salary_range:{
        type:String,
        required:true
    },
    job_type:{
        type:String,
        required:true
    },
    recruiter_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Recruiter,
        required:true
    },
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Company,
        required:true
    }
})

const Job=new mongoose.model('Job', jobSchema)
export default Job