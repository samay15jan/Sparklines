const express = require ('express')
const { authenticate } = require('../middlewares/auth')
const { updateUsername, imageUploader } = require('../middlewares/userData')
const multer = require('multer')
const upload = multer({ dest: 'public/avatar' })

const router = express.Router()

router.get('/profile', authenticate, (req, res) => {
    res.status(200).json(
        {
          userData: {
            userId: `${req.user._id}`,
            username: `${req.user.username}`,
            email: `${req.user.email}`,
            profilePic: `${req.user.profilePic}`
          } 
        }
    )
})

router.post('/username', updateUsername, (res) => {
  res.status(200).json({ message: `Successfully Updated` })
})

router.post('/profilePic', upload.single('profilePic'), imageUploader, (req, res) => {
    res.status(200).json({ message: 'Successfully Uploaded.',  profilePic: `${req.profilePic}` })
})

module.exports = router