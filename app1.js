import config from 'config'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import route1 from './routes/route1.js'
import morgan from 'morgan'


const port= process.env.PORT || 3000
const app=express()


if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(route1)

//connection to database
import './utilities/connection.js'


app.listen(port, ()=>{
    console.log('Server running on '+port)
})