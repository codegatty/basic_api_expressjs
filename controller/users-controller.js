const async_handler=require('express-async-handler')
const User=require('../models/userModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
require("dotenv").config()
//@desc register user
//@route POST /api/register
//@access public
const registerUser=async_handler(async_handler(async (req,res)=>{
    const body=req.body;
    const {username,email,password}=body

    if(!username || !email || !password){
        res.status(400);
        throw new Error("please enter value for required fields")
    }
    

     const userAvailability=await User.findOne({email});
    
     if(userAvailability){
        res.status(400);
         throw new Error("User already exists")
    }else{
        
         const hashedPassword=await bcrypt.hash(password,10)
         const newUser=await User.create({
            username,
            email,
            password:hashedPassword
         })

        if(newUser){
            res.status(201).json({_id:newUser.id,username,email});
        }else{
            res.status(400);
            throw new Error("use data not valid")
        }
  
     }
    
}))

//@desc login user
//@route POST /api/login
//@access public
const loginUser=async_handler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email ||!password){
        res.status(400);
        throw new Error("please enter value for required fields")
    }
    const user=await User.findOne({email})

    if(user && bcrypt.compare(password, user.password)){
        const token=jwt.sign({
            user:{username:user.username,
                email:user.email,
            id:user.id}},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})


        res.status(200).json({accessToken:token})
    }else{
        res.status(400);
        throw new Error("email or password incorrect")
    }
});

//@desc current user
//@route GET /api/current
//@access private

const currrentUser=async_handler(async (req,res)=>{
    res.json(req.user)
});

module.exports={
    registerUser,
    loginUser,
    currrentUser
}

