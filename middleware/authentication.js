import jwt from 'jsonwebtoken'
import User from '../models/model1.js'

const authMiddleware= async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        console.log(token)
        const decoded=jwt.verify(token, process.env.JWT_SECRET)
        const user= await User.findOne({_id:decoded._id, 'tokens.token':token})
        if(!user)
            {
                throw new Error()
            }
        req.token=token
        req.user=user
        next()
    }
    catch(error){
        res.status(404).send(error)
        console.log(error)
    }
}

export default authMiddleware