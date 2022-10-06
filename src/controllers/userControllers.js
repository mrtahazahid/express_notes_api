const userModel = require("../models/userModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const SECRET_KEY = process.env.SECRET_KEY;


const signUp = async (req,res)=>{
    console.log(SECRET_KEY)
    const {username, email, password} = req.body;

    try {
        const existingUser = await userModel.findOne({email : email})
        if(existingUser){
            return res.status(400).json({message : "User already exixts"})
        }

        const hashedPassword = await bycrypt.hash(password,10);

        const result = await userModel.create({
            email : email,
            password : hashedPassword,
            username : username
        });

        const token = jwt.sign({email : result.email, id : result._id}, SECRET_KEY)

        res.status(201).json({user : result, token : token})


    } catch (error) {
        console.log(error)
        console.log(error.message)
        res.status(500).json({message : "Something went wrong!"})
    }
}

const signIn = async (req,res)=>{
    const {username, email, password} = req.body;

    try {
        const existingUser = await userModel.findOne({email : email})
        if(!existingUser){
            return res.status(404).json({message : "User not found"})
        }

        const matchedPassword = await bycrypt.compare(password, existingUser.password)

        if(!matchedPassword){
            res.status(400).json({message : "Invalid Credentials"})
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id}, SECRET_KEY)

        res.status(200).json({user : existingUser, token : token})


    } catch (error) {
        console.log(error)
        res.status(400).json({message : "Invalid Credentials"})
    }
}

const getallusers = async (req,res)=>{
    try {
        const users = await userModel.find({userId : req.userId})
        if(users.length == 0){
            console.log(users)
            res.status(200).json({message : "No User Found"})
        }
        else{
            res.status(200).json(users)
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
}

//Delete all Users
const deleteuser = async (req,res)=>{
    const id = req.params.id;
    try {
        const user = await userModel.findByIdAndRemove(id);
        if(user == null){
            res.status(202).json({message : "No User Found"});
        }
        else{
            res.status(202).json(user);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
}

//Update User
const updateuser = async (req, res) =>{
    const id = req.params.id;
    const {username, email, password} = req.body;

    const newUser = {
        username : username,
        email : email,
        password: password,
        userId : req.userId
    }
        
    try {
        await userModel.findByIdAndUpdate(id,newUser,{new : true})
        res.status(200).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something went wrong"})
    }
}

module.exports = {signUp, signIn, getallusers, deleteuser, updateuser}