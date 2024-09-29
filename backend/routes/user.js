const express = require('express');
const router = express.Router();
const UserControllers = require('../controller/user') 
const auth = require('../middleware/userauth');


router.post('/register', UserControllers.Register);
router.post('/login', UserControllers.Login);

router.get('/orders', auth, UserControllers.getShopifyOrders); // Only authenticated users can access this route

module.exports = router