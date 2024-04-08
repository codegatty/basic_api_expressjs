const express=require('express');
const router=express.Router();

const {registerUser,loginUser,currrentUser,refreshToken,logout}=require('../controller/users-controller');
const tokenValidator = require('../middleware/tokenValidater');

router.post("/register",registerUser);

router.post("/login",loginUser)

router.get("/current",tokenValidator,currrentUser)

router.post("/refresh",refreshToken)
router.post("/logout",logout)

router.get("/hello",(req,res)=>{
    res.status(200).json({message:"hello and hi"});
})

module.exports=router;



