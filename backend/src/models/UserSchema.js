const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
        },
        profilePic: {
            type: String, 
            default: 'https://res.cloudinary.com/sparklines/image/upload/v1710355835/default/bzcj4ipftbmo48v30din.png'
        },
        newUser: {
            type: Boolean,
            default: true
        },
        languages: {
            type: [String],
            default: ['english']
        },
    }
)

// Generate a random username before saving the document
userSchema.pre('save', async function(next){
    const user = this
    if (!user.isModified('username')) {
        user.username = 'user' + Math.round(Math.random() * 1000000)
    }
    next()
})

// Hashing Password
userSchema.pre('save', async function(next){
    const user = this
    if(!user.isModified('password')){
        return next()
    }

    try {
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
        next()
    } catch (error) {
        return next(error)
    }
})

// Comparing Password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User