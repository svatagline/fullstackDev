const { default: mongoose } = require("mongoose")
const NoteModel = require("../models/noteModel")

const objectId = (id) => new mongoose.Types.ObjectId(id)
const GetAllNotes = async (req, res) => {
    try {
        const { user } = req.query
        const data = await NoteModel.find({ user: user })
        res.status(200).send({ data, message: "Get notes list successfully" })
    } catch (error) {
        res.status(500).send({ error, message: "Something went wrong" })
    }

}

const AddNote = async (req, res) => {
    try {
        const { userId, title,
            description,
        } = req.body
        const data = await NoteModel.insertOne({
            user: objectId(userId), title,
            description
        })

        res.status(200).send({ data, message: "Added note successfully" })
    } catch (error) {
        console.log("error", error)
        res.status(500).send({ error, message: "Something went wrong" })
    }

}
const UpdateNotes = async (req, res) => {
    try {
        const { _id, title, description } = req.body
        const data = await NoteModel.updateOne({ _id }, {
            ...(title ? { title } : {}),
            ...(description ? { description } : {})
        })

        res.status(200).send({ data, message: "Update note successfully" })
    } catch (error) {
        res.status(500).send({ error, message: "Something went wrong" })
    }

}
const DeleteNote = async (req, res) => {
    try {
        const { _id, isSoftDelete = 2 } = req.query

        if (isSoftDelete == 1) {
            await NoteModel.updateOne({ _id }, {
                isSoftDelete: 1
            })
        } else {
            await NoteModel.deleteOne({ _id })
        }

        const data = await NoteModel.find({ user: userId })
        res.status(200).send({ data, message: "Delete note successfully" })
    } catch (error) {
        res.status(500).send({ error, message: "Something went wrong" })
    }

}

module.exports = {
    GetAllNotes,
    AddNote,
    UpdateNotes,
    DeleteNote
}