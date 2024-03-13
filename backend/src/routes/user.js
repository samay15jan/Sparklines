const express = require ('express')
const { authenticate } = require('../middlewares/auth')
const { imageUploader } = require('../middlewares/imageUploader')
const multer = require('multer')
const upload = multer({ dest: 'public/avatar' })

const router = express.Router()

router.get("/profile", authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}, UserId: ${req.user._id}` })
})

router.post('/avatar', upload.single('avatar'), imageUploader, (req, res) => {
    res.json({ message: `Successfully uploaded. URL:${req.filename.secure_url}` })
})

module.exports = router