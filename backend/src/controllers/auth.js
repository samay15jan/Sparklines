const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken')

// Register new user
const register = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const user = User({ email, password })
        await user.save()
        res.status(201).json({ message: 'User Registered' })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
        next(error)
    }
}

// Login existing user
const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'User not found' })
        }
      
        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        const jwtToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        })

        res.status(200).json({ token: jwtToken, })
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login }