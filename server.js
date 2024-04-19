const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
require("dotenv").config()
const cors=require("cors");

const PORT=process.env.PORT || 3000

//built int middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser())
app.use(express.static("public"))

//router middleware
app.use("/api/contacts",require("./routes/contactRoute"))
app.use("/api",require("./routes/userRoute"));
app.use("/api/image",require("./routes/imageRoute"));

//error-handling  middleware
app.use(require('./middleware/errorHandler'))

//others
const connectDB=require('./config/dbConnection')
connectDB()

app.listen(PORT,()=>{
    console.log("server started at port "+PORT)
})


