const { Router } = require("express");
const { Login, Register } = require("../controller/userController");

const authRoutes = Router()

authRoutes.post('/login', Login)
authRoutes.post('/register', Register)


module.exports = authRoutes