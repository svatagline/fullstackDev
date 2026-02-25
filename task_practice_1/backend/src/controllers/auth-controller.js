
const User = require('../models/user-model')
const jwt = require('jsonwebtoken');
const { JWT_SECRETE } = require('../utils/constant');

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log({ user: JSON.stringify(user) })
        const match = req.body.password === user.password;

        if (match) {
            const accessToken = jwt.sign({ name: user.name }, JWT_SECRETE, { expiresIn: "1h" })

            res.json({ accessToken: accessToken, user: { name: user.name, role: user.role } });
        } else {
            res.json({ message: "Invalid Credentials" });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


