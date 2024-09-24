import multer from 'multer'
import cloudinary from '../utilities/cloudinaryConfig.js'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'user_profiles',
        allowed_formats:['jpg','png','jpeg','pdf']
    }
})

const upload=multer({
    storage:storage,
    limits:{
        file:1000000
    }
})

export default upload