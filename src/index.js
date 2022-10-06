const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const noteRoute = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");




app.use(express.json());
app.use(cors())

// app.use((req,res,next)=>{
//     console.log("HTTP Method - " + req.method + " , URL - " + req.url);
//     next();
// })


app.use("/users",userRoutes)
app.use("/notes",noteRoute)

const MONGO_CONNECTION_STRING = process.env.MONGO_URL;
console.log(MONGO_CONNECTION_STRING);

app.get("/",(req,res)=>{
    res.send("Welcome to Notes House 😊")
    res.status(200).json({message : "Notes API"})
})

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_CONNECTION_STRING)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server Started on port::"+PORT)
    })
})
.catch((error)=>{
    console.log(error)
})
