const express = require('express') 
const connectDB = require('../JioSaavnAPI/temp/src/database/db')
const authRoutes = require('../JioSaavnAPI/temp/src/routes/auth')
const userRoutes = require('../JioSaavnAPI/temp/src/routes/user')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})