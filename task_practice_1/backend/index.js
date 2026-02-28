const express = require("express")

const app = express()
const blogRoutes = require("./src/routes/blog-routes")
const { dbConnect } = require("./src/utils/dbconnect")

app.use(express.json())
dbConnect()

app.use("/api/blog", blogRoutes)

app.listen("5000", () => {
    console.log("Server started on http://localhost:5000")
})