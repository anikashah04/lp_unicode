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

//connection to database
require('./utilities/connection')


app.listen(port, ()=>{
    console.log('Server running on '+port)
})