import Recruiter from '../models/recruiter_model.js'
import Company from '../models/company_model.js'
import Job from '../models/job_model.js'

//create company
export const CreateCompany= async(req,res)=>{
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
        const companies= await Company.find().populate('recruiters')
        console.log('Companies fetched:', companies)
        if (companies.length === 0) 
            { return res.status(404).send({ message: 'No companies found' }); }
        res.status(200).send(companies)
    }catch(error){
        res.status(500).send(error)
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

export default {CreateCompany , ReadCompanies, DeleteCompany}