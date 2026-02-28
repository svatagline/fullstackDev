const { getBlogs, addBlog,
    updateBlog,
    deleteBlog } = require("../controller/blog-controller")
const express = require("express")
const routes = express.Router()


routes.get("/", getBlogs)
routes.post("/", addBlog)
routes.put("/", updateBlog)
routes.delete("/:id", deleteBlog)


module.exports = routes