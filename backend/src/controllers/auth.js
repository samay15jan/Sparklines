const User = require('../models/UserSchema')
const jwt = require('jsonwebtoken')

// Register new user
const register = async (req, res, next) => {
    const { email, password } = req.body
    const username = 'user' + Math.round(Math.random(1042313) * 2314231)
    const profilePic = 'https://res.cloudinary.com/sparklines/image/upload/v1710355835/default/bzcj4ipftbmo48v30din.png' 
    try {
        const user = User({ username, email, password, profilePic })
        await user.save()
        res.json({ message: 'Registration successful' })
    } catch (error) {
        next(error)
    }
}

// Login existing user
const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
      
        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' })
        }
      
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1 hour'
        });
        res.json({ token })
    } catch (error) {
        next(error)
    }
}

module.exports = { register, login }