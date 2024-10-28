import Company from '../models/company_model.js'
import Job from '../models/job_model.js'


//Create job listings
export const createJobListings=async(req,res)=>{
    try{
        const recruiterCompanyId=req.recruiter.company_id.toString()
        const jobCompanyId=req.body.company_id
        if(recruiterCompanyId !== jobCompanyId){
            return res.status(404).send({error: 'You can create jobs for the company you belong to'})
        }
        const job=new Job({
            ...req.body,
            recruiter_id: req.recruiter._id
        })
        await job.save()
        res.send(job).status(200)
    }
    catch(error)
    {
        res.send(error).status(500)
        console.log(error)
    }
}
//Read all job listings
export const readJobListings=async(req,res)=>{
    try{
        const jobs=await Job.find()
        // .populate('company_id','name')
        res.status(200).send(jobs)
    }
    catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export default {createJobListings, readJobListings}