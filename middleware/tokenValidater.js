const jwt=require("jsonwebtoken")
const ansyncHandler=require("express-async-handler")

const tokenValidator=ansyncHandler((req,res,next)=>{
    let token;
    let authheader=req.headers.authorization||req.headers.Authorization
    if(authheader && authheader.startsWith("Bearer")){
        token=authheader.split(" ")[1]
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decodedInfo)=>{
            if(err){
                res.status(401);
                throw new Error("invalid token")
            }
            req.user=decodedInfo.user;
            next()
        });
        if(!token){
            res.status(401);
            throw new Error("user unatharized or invalid")
        }
    }
    
})

module.exports=tokenValidator
