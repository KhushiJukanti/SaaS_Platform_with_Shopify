const express = require('express');
const router = express.Router();
const UserControllers = require('../controller/user') 


router.post('/register', UserControllers.Register);
router.post('/login', UserControllers.Login);

module.exports = router