import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import Videos from "./dbModel.js"
import Cors from "cors"
// App Config
const app = express();
const port = process.env.PORT || 9000
dotenv.config()

// Middleware
app.use(express.json())
app.use(Cors())

// DB Config
mongoose.connect(process.env.DB_URI,{
  useNewUrlParser:true
})

// API Endpoint
app.post("/v2/posts",(req,res)=>{
  Videos.create(req.body,(err,data)=>{
    if(err){
      res.status(500).send(err)
    }else{
      res.status(201).send(data)
    }
  })
})

app.get("/v2/posts",(req,res)=>{
  Videos.find((err,data)=>{
    if(err){
      res.status(500).send(err)
    }else{
      res.status(200).send(data)
    }
  })
})
// Listener

app.listen(port,()=>{
  console.log(`Listening on Localhost ${port}`);
})