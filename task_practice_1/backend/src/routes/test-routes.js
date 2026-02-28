const { getRecords, addRecord,
    updateRecord,
    deleteRecord } = require("../controller/test-controller")
const express = require("express")
const routes = express.Router()


routes.get("/", getRecords)
routes.post("/", addRecord)
routes.put("/", updateRecord)
routes.delete("/:id", deleteRecord)


module.exports = routes