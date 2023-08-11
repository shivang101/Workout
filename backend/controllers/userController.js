const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user

const loginUser = async (req, res) => {
    const { email, password } = req.body
    console.log("login started");
    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ user, token })
        console.log("login passed");

    } catch (error) {
        console.log("login failed");
        res.status(400).json({ error: error.message })
    }
}


// signup a user
const signupUser = async (req, res) => {
    const { email, password, name } = req.body
    console.log("signup Started started");
    console.log(email, password, name);

    try {
        const user = await User.signup(email, password, name)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({ email, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
        console.log("signup Failed");
    }
}

module.exports = { signupUser, loginUser }