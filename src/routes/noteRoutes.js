const express = require("express");
const { geteNote, createNote, updateNote, deleteNote } = require("../controllers/noteControllers");
const noteRoute = express.Router();
const auth = require("../middlewares/auth")

noteRoute.get("/", auth, geteNote)

noteRoute.post("/", auth , createNote)

noteRoute.put("/:id", auth, updateNote);

noteRoute.delete("/:id", auth, deleteNote)

module.exports = noteRoute;