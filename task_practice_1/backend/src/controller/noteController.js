const { default: mongoose } = require("mongoose")
const NoteModel = require("../models/noteModels")

const objectId = (id) => new mongoose.Types.ObjectId(id)

const GetNotes = async (req, res) => {
    try {
        const { user } = req.params
        const data = await NoteModel.find({ user })
        res.status(200).send({ data, message: "Note list get successfully" })
    } catch (error) {
        console.log("Error found: ", error)
        res.status(401).send({ error, message: "Something went wrong" })
    }

}


const AddNote = async (req, res) => {
    try {
        const { title, description } = req.body
        const { user } = req.query
        const data = await NoteModel.insertOne({
            title,
            description,
            user: objectId(user),
        })
        res.status(200).send({ data, message: "Note added successfully" })
    } catch (error) {
        console.log("Error found: ", error)
        res.status(401).send({ error, message: "Something went wrong" })
    }

}


const UpdateNote = async (req, res) => {
    try {
        const { title, description } = req.body
        const { _id } = req.query
        const data = await NoteModel.updateOne({ _id }, {
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
        })

        res.status(200).send({ data, message: "Note updated successfully" })
    } catch (error) {
        console.log("Error found: ", error)
        res.status(401).send({ error, message: "Something went wrong" })
    }

}


const DeleteNotes = async (req, res) => {
    try {

        const { _id, isSoftDelete } = req.query
        if (isSoftDelete == 1) {

            await NoteModel.updateOne({ _id }, { isSoftDelete: 1 })
        } else {
            await NoteModel.deleteOne({ _id })
        }
        res.status(200).send({ message: "Note deleted successfully" })
    } catch (error) {
        console.log("Error found: ", error)
        res.status(401).send({ error, message: "Something went wrong" })
    }

}

module.exports = {
    GetNotes,
    AddNote,
    UpdateNote,
    DeleteNotes
}