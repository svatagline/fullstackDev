const mongoos = require('mongoose')

const { Schema } = mongoos

const blogSchema = new Schema({
    title: String,
    versionId: String,
    views: Number,
    isSoftDeleted: Number // 1:yes 2:no
})


const blogVersionSchema = new Schema({
    content: String,
    blogId: String,
    isSoftDeleted: Number, // 1:yes 2:no
    createdDate: {
        type: Date, default: Date.now()
    },
})

const BlogTable = mongoos.model("Blog", blogSchema)
const BlogVersionTable = mongoos.model("BlogVersion", blogVersionSchema)

module.exports = { BlogTable, BlogVersionTable }