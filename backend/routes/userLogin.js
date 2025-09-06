const express = require('express');
const router = express.Router()
const { signupHandler, loginHandler } = require('../controller/userLogin')

router.route('/signup').post(signupHandler)

router.route('/login').post(loginHandler)
module.exports = router