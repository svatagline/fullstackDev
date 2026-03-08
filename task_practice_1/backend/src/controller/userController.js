const NoteModel = require("../models/noteModel")
const UserModel = require("../models/userModel")
const { manageToken, managePwd } = require("../utils/function")

const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (user) {

            const compare = await managePwd("compare", password, user.password)
            console.log({ compare })
            if (compare) {
                const { name, email } = user
                const jwtToken = await manageToken('create', {
                    email,
                    name
                })
                console.log({ jwtToken })
                res.status(200).send({
                    token: jwtToken,
                    data: {
                        name,
                        email
                    }, message: "Login successfully"
                })
            } else {
                res.status(401).send({ message: "Password incorrect" })
            }
        } else {

            res.status(401).send({ message: "User note found" })
        }
    } catch (error) {
        res.status(500).send({ error, message: "Something went wrong" })
    }

}

const Registration = async (req, res) => {
    try {
        const { email, password, name,
        } = req.body

        const encyptPwd = await managePwd("encode", password, () => { })

        const data = await UserModel.insertOne({
            email,
            password: encyptPwd,
            name
        })



        res.status(200).send({ data, message: "User registered successfully" })
    } catch (error) {
        console.log("Error:", error)
        res.status(500).send({ error, message: "Something went wrong" })
    }

}

module.exports = {
    Login,
    Registration
}