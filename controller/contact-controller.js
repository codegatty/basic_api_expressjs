const async_handler=require('express-async-handler')
const Contact = require('../models/cotactModel')
/*this will help to implementing try catch for 
async request and response automatically handles the error by passing error to cusome
error handler middle ware*/

//@desc get all contact
//@route GET /api/contact
//@access private

const getContacts=async_handler(async (req,res)=>{
     const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
    
})


//@desc get a contact
//@route GET /api/contact
//@access private

const getContact=async_handler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(200).json(contact);
  
})

//@desc create new contact
//@route POST /api/contact
//@access private

const createContact=async_handler(async (req,res)=>{
    const{name,email,phone}=req.body;
    console.log("request reached");
    if(!name && !email && !phone){
        res.status(400);
        throw new Error("please enter value for required fields")
    }

    const contact=await Contact.create({
        user_id:req.user.id,
        name,
        email,
        phone
    })
    res.status(201).json(contact);
});

//@desc update existing contact
//@route PUT /api/contact
//@access private

const updateContact=async_handler(async (req,res)=>{

    const contact = await findById(req.params.id)

    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("you are not authorized to update this contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,req.body,{new:true});

    res.status(200).json(updatedContact);
})

//@desc delete existing contact
//@route DELETE /api/contact
//@access private

const deleteContact=async_handler(async (req,res)=>{

    const contact = await Contact.findById(req.params.id)
    console.log(contact)



    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }

    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("you are not authorized to update this contact")
    }

    await Contact.deleteOne({_id:contact._id})
    res.status(200).json(contact);
})

module.exports={getContacts,getContact,createContact,updateContact,deleteContact};
