const express=require("express");
const app=express();
require("dotenv").config()

const PORT=process.env.PORT || 3000

//built int middleware
app.use(express.json())

//router middleware
app.use("/api/contacts",require("./routes/contactRoute"))
app.use("/api",require("./routes/userRoute"));

//error-handling  middleware
app.use(require('./middleware/errorHandler'))

//others
const connectDB=require('./config/dbConnection')
connectDB()

app.listen(PORT,()=>{
    console.log("server started at port "+PORT)
})


