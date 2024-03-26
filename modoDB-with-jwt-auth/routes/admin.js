const {createAdmin, adminSignIn} = require('../controllers/adminCon')
const authorize = require('../middleware/auth')

const express = require('express')
const router  = express.Router()

router.post('/signup', createAdmin);

router.post('/signin', authorize , adminSignIn);


module.exports = router;