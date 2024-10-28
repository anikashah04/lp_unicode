import mongoose from 'mongoose'
import User from './user_model.js'
import Company from './company_model.js'

const follower_following_schema=({
    follower_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    following_id:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'followingModel', // Uses followingModel to decide which model to refer to
        required:true
    },
    followingModel:{
        type:String,
        required:true,
        enum:['User', 'Company'] // Allows value 'User' and 'Company' only
    },
    follow_date:{
        type:Date,
        default:Date.now
    }
})

const Follower_Following =new mongoose.model('Follower_Following', follower_following_schema)

export default Follower_Following