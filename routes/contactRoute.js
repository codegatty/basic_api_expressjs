const express=require("express");
const router=express.Router();

const {
    getContacts,
    getContact,
    createContact,
    deleteContact,
    updateContact}=require("../controller/contact-controller");
const tokenValidator = require("../middleware/tokenValidater");

router.use(tokenValidator);//this method which apply middleware for all routes
// console.log("request reached endpoi")
 router.get("/",getContacts);
 router.post("/",createContact);

// router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)
router.get("/test",(req,res)=>{
    res.send("whatis theis")
})
module.exports=router;

