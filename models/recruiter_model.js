import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from'bcrypt'
import validator from 'validator'

const recruiterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    Join_date:{
        type:Date
    },
    qualification:{
        type:String,
        required:true
    },
    current_position:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    company_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company',
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true,
            select:false
        }
    }]
})

recruiterSchema.methods.generateAuthToken2= async function() {
    const recruiter=this;
    const token=jwt.sign({_id:recruiter._id.toString()}, process.env.JWT_SECRET) // creates a tpken
    recruiter.tokens=recruiter.tokens.concat({token:token}) //adds the token to the array of tokens to the user 
    await recruiter.save()
    return token //so that it can be used in other parts of the code
}

//Hashing the plain text into hashed password
//pre is a middleware which hashes password before saving the user to the database
recruiterSchema.pre('save', async function(next){
    const recruiter=this

    //hashes password only if user changes it or for first time sign up
    if(recruiter.isModified('password'))
        {
            recruiter.password=await bcrypt.hash(recruiter.password, 10)
        }
    //console.log(user.password)
    next() //gives mongoose symbol to save the user
})


//Athenticating User
//statics --> method is added to recruiter model directly 
recruiterSchema.statics.authenticate= async(email,password)=>{
    const recruiter= await Recruiter.findOne({email:email})
    if(!recruiter){
        throw new Error('Unable to find User')
    }
    const isMatching= await bcrypt.compare(password, recruiter.password)
    if(!isMatching){
        throw new Error('Incorrect Password')
    }
    return recruiter
}

recruiterSchema.methods.toJSON= function (){
    const recruiter=this
    const recruiterObject= recruiter.toObject() // mongoose method

    delete recruiterObject.password
    delete recruiterObject.tokens

    return recruiterObject
}

const Recruiter=new mongoose.model('Recruiter', recruiterSchema)

export default Recruiter