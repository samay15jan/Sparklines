const express = require ('express')
const { authenticate } = require('../middlewares/auth')
const { updateData, imageUploader, addLanguages } = require('../middlewares/userData')
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

router.post('/updateData', updateData, (req, res) => {
  res.status(200).json(
    {   
      userData:{
        username: `${req.user.username}`,
        profilePic: `${req.user.profilePic}`
      }
    }
  )
})

router.post('/imageUploader', upload.single('profilePic'), imageUploader, (req, res) => {
  res.status(200).json({ profilePic: `${req.profilePic}` })
})

router.post('/addLanguages', addLanguages, (req, res) => {
  res.status(200).json({ languages: req.languages })
})

module.exports = router