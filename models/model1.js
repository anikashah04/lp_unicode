import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from'bcrypt'
import validator from 'validator'


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
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
    //stores all the tokens created of that instance of the user
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]

})

//Creating tokens for current user
userSchema.methods.generateAuthToken= async function() {
    const user=this;
    const token=jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET) // creates a tpken
    user.tokens=user.tokens.concat({token:token}) //adds the token to the array of tokens to the user 
    await user.save()
    return token //so that it can be used in other parts of the code
}

//Hashing the plain text into hashed password
//pre is a middleware which hashes password before saving the user to the database
userSchema.pre('save', async function(next){
    const user=this

    //hashes password only if user changes it or for first time sign up
    if(user.isModified('password'))
        {
            user.password=await bcrypt.hash(user.password, 10)
        }
    //console.log(user.password)
    next() //gives mongoose symbol to save the user
})


//Athenticating User
//statics --> method is added to User model directly 
userSchema.statics.authenticate= async(email,password)=>{
    const user= await User.findOne({email:email})
    if(!user){
        throw new Error('Unable to find User')
    }
    const isMatching= await bcrypt.compare(password, user.password)
    if(!isMatching){
        throw new Error('Incorrect Password')
    }
    return user
}



const User=new mongoose.model('User', userSchema)

export default User