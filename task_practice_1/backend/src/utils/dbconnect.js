const mongoos = require('mongoose')


const dbConnect = async () => {
    try {

        await mongoos.connect("mongodb+srv://sagar1:sagar@fullstakedevpractice.mu5ssib.mongodb.net/blog")

        console.log("Database Connected successfully")
    } catch (error) {
        console.error("Error in Database Connection :", error.message)
    }
}

module.exports = { dbConnect }