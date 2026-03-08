const mongoose = require('mongoose')

const { Schema } = mongoose

const noteSchema = new Schema({
    title: String,
    description: String,
    user: Schema.ObjectId,
    isSoftDelete: Number
})

const NoteModel = mongoose.model("notes", noteSchema)

module.exports = NoteModel