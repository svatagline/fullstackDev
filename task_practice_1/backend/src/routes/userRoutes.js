const express = require("express")
const { Registration, Login } = require("../controller/userController")

const userRouter = express.Router()

userRouter.post("/login", Login)
userRouter.post("/register", Registration)

module.exports = userRouter