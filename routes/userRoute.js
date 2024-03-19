const express=require('express');
const router=express.Router();

const {registerUser,loginUser,currrentUser}=require('../controller/users-controller');
const tokenValidator = require('../middleware/tokenValidater');

router.post("/register",registerUser);

router.post("/login",loginUser)

router.get("/current",tokenValidator,currrentUser)

module.exports=router;



