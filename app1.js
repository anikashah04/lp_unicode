import config from 'config'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import route1 from './routes/route1.js'
import morgan from 'morgan'

import cors from 'cors'
import user_controller from './controllers/user_controller.js'


const port= process.env.PORT || 3000
const app=express()


if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use('/api' ,route1)
app.use(cors())
app.get(route1)


app.use(cors({
    origin: 'https://lp-unicode-g5q8.onrender.com'  // Allow only this domain
  }));


//connection to database
import './utilities/connection.js'


app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Server running on ' + port);
    }
  });

// const sendResponse=async(req,res)=>{
//   res.send('Hello')
// }
// app.get('/', sendResponse)


export default app
  