const express=require("express");
const app=express();
const fileupload=require("express-fileupload");
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser");
const cors=require("cors");
const mongoose=require("mongoose");
require("dotenv").config();

// jwt checke
const { checkUser ,requireAuth }=require("./middleware/auth-middleware")

// connection mongodb
mongoose.connect(process.env.MONGODB_URL).then(()=>{console.log(`Database is connectes`);})

// router
const userRouter=require("./routes/user-router");
const corsOption={
    origin:process.env.CLIENT_URL,
    credentials:true,
    'allowedHeaders':['sessionId','Content-Type'],
    'exposedHeaders':['sessionId'],
    'methods':'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue':false

}

app.use(cors(corsOption));
app.use(cookieParser());
app.use(fileupload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// jwt
app.get("*",checkUser);
app.get("/jwtid",requireAuth,(req,res)=>{
    res.status(200).send(res.locals.user._id);
})

// api
app.use("/api/users",userRouter);

// server
app.listen(process.env.PORT,()=>{
    console.log(`Server run on port ${process.env.PORT}`);
})