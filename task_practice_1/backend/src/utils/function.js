const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const managePwd = async (action = 'encode', password, hash) => {
    try {
        let res
        if (action === 'encode') {
            res = await bcrypt.hash(password, saltRounds);
        } else {
            console.log({ password, hash })
            res = await bcrypt.compare(password, hash);
        }

        return res
    } catch (error) {
        console.log("Error in manage password: ", error)
        return null
    }
}


const manageToken = async (action = 'create', data, token) => {
    const secrete = "123456789"
    try {
        let res
        if (action === 'create') {
            res = await jwt.sign(data, secrete, { expiresIn: '1h' });
        } else {
            res = await jwt.verify(token, secrete);
        }

        return res
    } catch (error) {
        console.log("Error in manage password: ", error)
        return null
    }
}

module.exports = { managePwd, manageToken }