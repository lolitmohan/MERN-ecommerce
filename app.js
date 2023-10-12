const express=require('express');
const router=require('./src/router/api');

const app=new express();

const bodyParser=require('body-parser');


// Body Parser Implement
app.use(bodyParser.json())

const mongoose=require('mongoose');


let URL='mongodb://localhost:27017/School';
let OPTION={user:'',pass:'', autoIndex:true};
mongoose.connect(URL,OPTION).then((res)=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err)
})


// Routing Implement
app.use("/api/v1",router)

// Undefined Route Implement
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})

module.exports=app;