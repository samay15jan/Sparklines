import mongoose from "mongoose"
require('dotenv').config()

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('mongodb connected successfully')
    } catch (error) {
        console.log('An error occured: ', error)
    }
}

module.exports = connectDB