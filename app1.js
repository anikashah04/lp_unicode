import config from 'config'
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
//import route1 from './routes/route1.js'
import morgan from 'morgan'

import cors from 'cors'

const port= process.env.PORT || 3000
const app=express()


if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.use(cors());

//connection to database
import './utilities/connection.js'

import userRoutes from './routes/user_router.js'
import recruiterRoutes from './routes/recruiter_router.js'
import companyRoutes from './routes/company_router.js'
import jobRoutes from './routes/job_router.js'
import blogRoutes from './routes/blog_router.js'

app.use('/user',userRoutes)
app.use('/recruiter',recruiterRoutes)
app.use('/company',companyRoutes)
app.use('/recruiter',jobRoutes)
app.use('/blog',blogRoutes)

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
    if (process.env.NODE_ENV !== 'test') {
      console.log('Server running on ' + port);
    }
  });


export default app
  