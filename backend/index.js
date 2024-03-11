const express = require('express') 
const connectDB = require('./database/db')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(express.json())

app.use('/auth', authRoutes)

app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})