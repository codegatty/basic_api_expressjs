import React from 'react'
import {useForm} from 'react-hook-form'
import { useContext } from 'react';
import {AuthContext} from '../context/AuthProvider'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

import ImageUpload from './ImageUpload';


function Login() {
    const authCtx=useContext(AuthContext)
    const navigate=useNavigate()
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({defaultValues:{
        email:"admin123@gmail.com",password:"admin"
    }});

    async function submitHandler(data){
        try{
            const response=await axios.post("http://localhost:5000/api/login",data,{withCredentials:true});
            const accessToken = response.data.accessToken
            
            authCtx.storeToken(accessToken)
            navigate("/profile");
        }catch(err){
            console.log(err);
        }
    }

  return (
    <div className='w-screen h-screen bg-neutral-500 flex items-center justify-center'>


        
    <form className='flex flex-col w-80 bg-red-400' onSubmit={handleSubmit(submitHandler)}>
        <h1 className='text-center text-2xl mt-5 font-bold'>LOGIN</h1>
        <input  {...register("email",{
            required: "email required",
        })}className='p-5 m-5'type='email' placeholder='Enter the email'/> 
        {errors.email&&<div>enter email</div>}
        <input  {...register("password",{
            required: "password required"
        })}className='p-5 m-5' type='password' placeholder='Enter the password'/>
        {errors.password&&<div>enter password</div>}
        <button className='p-5 m-5 bg-green-700'type='submit'>{isSubmitting?"loading..":"login"}</button>      
    </form>
    
    </div>
  )
}

export default Login
