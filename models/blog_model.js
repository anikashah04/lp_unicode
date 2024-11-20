import mongoose from 'mongoose'
import User from './user_model.js'
import Company from './company_model.js'

const blogSchema=({

    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'authorModel',
        required:true
    },
    authorModel:{
        type:String,
        required:true,
        enum:['User','Company']
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        required:true,
        default:[]
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    likes:[{
        liked_id:{
            type:mongoose.Schema.Types.ObjectId,
            refPath:'liked_by'
        },
        liked_by:{
            type:String,
            enum:['User', 'Recruiter']
        }
    }]
})

const Blog=new mongoose.model('Blog', blogSchema)

export default Blog