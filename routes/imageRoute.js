const express=require("express");
const route=express.Router();

const multer=require("multer");

const Image=require("../models/imageModel");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+file.originalname)
    }
  })
  const upload = multer({ storage: storage })

route.post('/',upload.single("image"),async (req,res)=>{
  const imageName=req.file.filename
  try{
    Image.create({image:imageName})
  }catch(er){
    console.log(er)
    return res.status(500).send({message:"Internal server error"})
  }
    return res.status(200).send({message:"uploaded"});

})

route.get("/",async(req,res)=>{
  try{
    const data=await Image.find({});
    res.status(200).json({"data":data})
  }catch(error){
    console.log(error)
    return res.status(500).send({message:"Internal server error"})
  }
})

module.exports=route