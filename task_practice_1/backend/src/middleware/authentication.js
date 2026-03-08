// Import the required dependencies 
const { manageToken } = require("../utils/function");

// Export middleware function to handle authentication
module.exports = async function auth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send("Access denied. No token provided");

    try {
        const decoded = await manageToken('verify', "_", token);
        console.log({ decoded })

        if (decoded.email) next();
        else return res.status(401).send("Access denied. Not an authorized");
    } catch (err) {
        console.log("Error:", err)
        return res.status(400).send("Invalid token");
    }
};