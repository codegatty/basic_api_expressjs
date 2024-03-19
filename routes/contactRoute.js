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

router.route("/").get(getContacts).post(createContact)

router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)

module.exports=router;

