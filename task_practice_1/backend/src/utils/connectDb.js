const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        await mongoose.connect(
            process.env.MONGODB_URI || "mongodb+srv://sagar1:sagar@fullstakedevpractice.mu5ssib.mongodb.net/inventory",

        );

        console.log("Db connected")
    } catch (error) {
        console.log("Error in database connection", error)

    }


}

module.exports = connectDB