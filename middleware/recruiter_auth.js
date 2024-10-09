import jwt from 'jsonwebtoken'
import Recruiter from '../models/recruiter_model.js'

const recruiterAuthMiddleware= async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const recruiter= await Recruiter.findOne({_id:decoded._id, 'tokens.token':token})
        if(!recruiter)
            {
                throw new Error()
            }
        req.token=token
        req.recruiter=recruiter
        next()
    }
    catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}

export default recruiterAuthMiddleware 