const mongoose = require("mongoose")

const connectDb = async () => {
    const url = `mongodb+srv://sagar1:sagar@fullstakedevpractice.mu5ssib.mongodb.net/todo`
    try {
        await mongoose.connect(url)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error found in db connection: ", error)

    }
}

module.exports = connectDb