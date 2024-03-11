const express = require ('express')
const { authenticate } = require('../middlewares/auth')

const router = express.Router()

router.get("/profile", authenticate, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` })
})

module.exports = router