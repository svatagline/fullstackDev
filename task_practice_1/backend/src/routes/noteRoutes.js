const express = require("express")
const { DeleteNote, UpdateNotes, AddNote, GetAllNotes } = require("../controller/noteController")
const authentication = require("../middleware/authentication")

const noteRouter = express.Router()

noteRouter.get("/", authentication, GetAllNotes)
noteRouter.post("/", authentication, AddNote)
noteRouter.put("/", authentication, UpdateNotes)
noteRouter.delete("/", authentication, DeleteNote)

module.exports = noteRouter