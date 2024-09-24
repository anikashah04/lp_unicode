import pkg from 'cloudinary'
const { v2: cloudinary } = pkg
import dotenv from 'dotenv'
dotenv.config()
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import path from 'path'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET_KEY
})

export default cloudinary