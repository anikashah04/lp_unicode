//connecting to database

import config from 'config'
import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

import {MongoClient} from 'mongodb'

const connection=mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to DATABASE')
}).catch((error)=>{
    console.log(error)
})

export default connection 