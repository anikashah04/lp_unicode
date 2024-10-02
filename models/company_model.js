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
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

const Company= new mongoose.model('Company',companySchema)

export default Company