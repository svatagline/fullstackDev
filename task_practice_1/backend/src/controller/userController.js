
const { managePwd, generateToken } = require("../utils/function")
const UserModel = require("../models/userModels")


const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await UserModel.findOne({ email })
        if (data) {
            const metch = await managePwd("metch", password, data?.password)
            if (metch) {
                const token = await generateToken(data)
                res.status(200).send({ data, token, message: "User login successfully" })

            }


        } else {
            res.status(400).send({ message: "User not found" })
        }

    } catch (error) {
        console.log("Error found: ", error)
        res.status(400).send({ error, message: "Something went wrong" })
    }

}


const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const isExistUser = await UserModel.findOne({ email })
        if (isExistUser) {
            res.status(400).send({ message: "User already exist on this email" })
        }

        const encodedPwd = await managePwd("encode", password)

        const data = await UserModel.insertOne({
            name,
            email,
            password: encodedPwd,
        })
        res.status(200).send({ data, message: "User registered successfully" })
    } catch (error) {
        console.log("Error found: ", error)
        res.status(401).send({ error, message: "Something went wrong" })
    }

}



module.exports = {
    Login,
    Register
}