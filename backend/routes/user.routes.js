const express = require('express')
const { Signup, Login, getUserById } = require('../controllers/user.controller')
const router = express.Router()
const upload = require('../middlewares/multer')

router.post('/signup',upload.single('profileImage'),Signup)
router.post('/login',Login)
router.get('/getUserById/:id',getUserById)

module.exports = router