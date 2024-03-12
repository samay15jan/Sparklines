const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected Successfully !!')
    } catch (error) {
        console.log('An error occured: ', error)
    }
}

module.exports = connectDB