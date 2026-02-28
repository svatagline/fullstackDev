const express = require("express")

const app = express()
const testRoutes = require("./src/routes/test-routes")
const { dbConnect } = require("./src/utils/dbconnect")

app.use(express.json())
dbConnect()

app.use("/api/blog", testRoutes)

app.listen("5000", () => {
    console.log("Server started on http://localhost:5000")
})