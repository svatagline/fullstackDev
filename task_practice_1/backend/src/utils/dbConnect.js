const mongoose = require('mongoose')

const dbConect = async () => {
    try {
        const url = `mongodb+srv://sagar1:sagar@fullstakedevpractice.mu5ssib.mongodb.net/todo`
        await mongoose.connect(url)

        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error in database connection: ", error)

    }
}

module.exports = dbConect