const express=require('express')
const mongoose=require('mongoose')
const route1=require('./routes/route1')
const morgan=require('morgan')
require('dotenv').config()

const port= process.env.PORT || 3000
const app=express()


if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(route1)

//connecting to database
const MongoClient=require('mongodb').MongoClient
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to DATABASE')
}).catch((error)=>{
    console.log(error)
})


app.listen(port, ()=>{
    console.log('Server running on '+port)
})