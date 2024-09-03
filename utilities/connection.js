//connecting to database

const mongoose=require('mongoose')

const MongoClient=require('mongodb').MongoClient

const connection=mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to DATABASE')
}).catch((error)=>{
    console.log(error)
})

module.exports=connection 