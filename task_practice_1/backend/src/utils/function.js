const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { JWT_SECRET } = require('./constant')

function generateToken(user) {
    return jwt.sign(
        { id: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    )
}

function verifyToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Access denied' })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: 'Invalid token' })
        req.user = decoded
        next()
    })
}


async function managePwd(action = "encode", password, hash) {
    const saltRounds = 10;

    let res

    try {
        if (action === 'encode') {
            res = await bcrypt.hash(password, saltRounds);
        } else {
            res = await bcrypt.compare(password, hash);
        }
        return res

    } catch (error) {
        console.log("Error found:", error)
        return null

    }
}
module.exports = {
    generateToken,
    verifyToken,
    managePwd
}