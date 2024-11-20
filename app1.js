import config from 'config'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import route1 from './routes/route1.js'
import morgan from 'morgan'

import cors from 'cors'


const port= process.env.PORT || 3000
const app=express()


if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(route1)
app.use(cors())

// app.use(cors({
//     origin: 'https://anikashah21.com'  // Allow only this domain
//   }));


//connection to database
import './utilities/connection.js'


app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Server running on ' + port);
    }
  });

export default app
  