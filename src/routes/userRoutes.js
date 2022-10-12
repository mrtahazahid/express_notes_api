const express = require("express");
const { signUp, signIn, getallusers, deleteuser, updateuser } = require("../controllers/userControllers");
const userRoutes = express.Router();
const auth = require("../middlewares/auth")

//SignUp Functions
userRoutes.post("/signup", signUp)

//SignIn Functions
userRoutes.post("/signin", signIn)

//Get all users
userRoutes.get("/", getallusers)

//Delete user
userRoutes.delete("/:id", deleteuser)

//Update user
userRoutes.put("/:id", updateuser)

module.exports = userRoutes;