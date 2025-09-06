const express = require('express');
const router = express.Router()
const signupHandler = require('../controller/userLogin')

router.route('/signup').get(signupHandler)

module.exports = router