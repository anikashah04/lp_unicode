import mongoose from "mongoose";
const companySchema=({
    name:{
        type:String,
        required:true
    },
    website_url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    recruiters:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Recruiter'
    }]
})

const Company= new mongoose.model('Company',companySchema)

export default Company