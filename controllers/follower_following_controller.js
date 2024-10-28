import Follower_Following from '../models/follower_following_model.js'
import User from '../models/user_model.js'
import Company from '../models/company_model.js'

export const follow=async(req,res)=>{
    try{    
        const follow=new Follower_Following(req.body)
        const { follower_id, following_id, followingModel } = req.body 
        const existingFollow =await Follower_Following.findOne({
            follower_id, following_id, followingModel
        })
        if(existingFollow)
        {
            return res.status(400).send({message:'Already Following'})
        }
        await follow.save()
        res.status(201).send({message:'Followed Successfully', follow})

    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export const unfollow=async(req,res)=>{
    try{    
        const unfollow=new Follower_Following(req.body)
        const { follower_id, following_id, followingModel } = req.body 
        const existingFollow =await Follower_Following.findOne({
            follower_id, following_id, followingModel
        })
        if(!existingFollow)
        {
            return res.status(400).send({message:'No User/Company Found'})
        }
        await Follower_Following.deleteOne({_id:existingFollow._id})
        res.status(201).send({message:'Unfollowed Successfully', unfollow})

    }catch(error){
        res.status(500).send(error)
        console.log(error)
    }
}

export const view_followers_following=async(req,res)=>{
    try{
        const id=req.params._id
        const followers= await Follower_Following.find({
        following_id:id,
       }).populate('follower_id', 'name')

       const followings= await Follower_Following.find({
        follower_id:id,
       }).populate('following_id', 'name')

       res.status(200).send({followers, followings})


    }catch(error){
        console.log(error)
    }
}

export default{ follow, unfollow, view_followers_following}