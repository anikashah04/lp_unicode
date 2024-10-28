import Recruiter from '../models/recruiter_model.js'
import Company from '../models/company_model.js'
import Job from '../models/job_model.js'
import Application from '../models/application_model.js'
import User from '../models/user_model.js'

//Applying for job
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

//view Applicants
export const viewApplicants=async(req,res)=>{

    try{
        const jobId=req.params.job_id
        // const applications=await Application.find().populate('user_id') 
        const applications = await Application.find().populate({
            path: 'user_id',
            select: 'name resume_url email tech_stack field_of_interest experience_level'
        })
        if(!applications.length === 0){
            return res.status(404).send({error:'Applications not found'})
        }
        res.status(200).send(applications)
    
    }
    catch(error)
    {
        res.send(error).status(500)
        console.log(error)
    }

}

export default {apply, viewApplicants}