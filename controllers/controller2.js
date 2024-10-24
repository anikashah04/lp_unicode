import nodemailer from 'nodemailer'
import Recruiter from '../models/recruiter_model.js'
import Company from '../models/company_model.js'
import Job from '../models/job_model.js'

//Sign Up
export const signupR= async(req,res)=>{
    
    const recruiter=new Recruiter({
        ...req.body,
        company_id: req.body.company_id
    })
    console.log(req.body.email)
    try{
        await recruiter.save()

        //linking recruiter to company
        const company=await Company.findByIdAndUpdate(recruiter.company_id)
        if(company){
            company.recruiters.push(recruiter._id)
            await company.save()
        }
        else{
            console.log('Not Found')
        }

        const token=await recruiter.generateAuthToken2()
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
        const populatedRecruiter= await Recruiter.findById(recruiter._id).populate('company_id')
        res.status(201).send({recruiter:populatedRecruiter,token})
    }
    catch(error){
        res.status(400).send(error)
        console.log(error)
    }
}

//Login
export const loginR=async(req,res)=>{
    try{
        const recruiter= await Recruiter.authenticate(req.body.email, req.body.password)
        const token=await recruiter.generateAuthToken2()
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
        res.status(200).send({recruiter: recruiter,token})
    }
    catch(error)
    {
        res.status(400).send({error: error.message})
    }
}

//Read
export const readR= async(req,res)=>{
    try{
        const recruiter = await Recruiter.findById(req.recruiter._id).populate('company_id')
        if (!recruiter) {
            return res.status(404).send({ error: 'Recruiter not found' })
        }
        res.send(recruiter)
    }catch(error){
        res.send(error)
    }
}

//Delete
export const deleteR= async(req,res)=>{
    try{
        await Recruiter.findByIdAndDelete(req.recruiter._id)
        res.status(200).send(req.recruiter)
    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export const companyR= async(req,res)=>{
    const company=new Company(req.body)
    try{
        await company.save()
        res.status(201).send(company)
    }catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}

//Read company
export const ReadCompanies=async(req,res)=>{
    try{
        const companies= await Company.find()
        res.send(companies)
    }catch(error){
        res.send(error)
    }
}
//Delete Company
export const DeleteCompany= async(req,res)=>{
    try{
        const company=await Company.findByIdAndDelete(req.params.id)
        res.send(company).status(200)
    }catch(error)
    {
        res.send(error).status(500)
        console.log(error)
    }
}

//Create job listings
export const createJobListings=async(req,res)=>{
    try{
        const recruiterCompanyId=req.recruiter.company_id.toString()
        const jobCompnayId=req.body.company_id
        if(recruiterCompanyId !== jobCompnayId){
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

//view Applicants
export const viewApplicants=async(req,res)=>{

    try{
        const jobId=req.params.job_id
        const job=await Job.findById(jobId).populate({
        path:'user_id', select:'name resume'
        }).exec() //executes the query
        if(!job){
            return res.status(404).send({error:'Job not found'})
        }
        res.status(200).send(job.applications)
    
    }
    catch(error)
    {

    }


}

export default { signupR, loginR, readR, deleteR, companyR , ReadCompanies, DeleteCompany, createJobListings, viewApplicants}