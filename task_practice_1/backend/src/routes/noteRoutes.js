const { Router } = require("express");
const { GetNotes, AddNote,
    UpdateNote,
    DeleteNotes } = require("../controller/noteController");

const noteRoutes = Router()

noteRoutes.get('/:user', GetNotes)
noteRoutes.post('/', AddNote)
noteRoutes.put('/', UpdateNote)
noteRoutes.delete('/', DeleteNotes)


module.exports = noteRoutes