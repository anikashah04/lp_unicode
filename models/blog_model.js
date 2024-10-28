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
        requierd:true,
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
    }
})

const Blog=new mongoose.model('Blog', blogSchema)

export default Blog