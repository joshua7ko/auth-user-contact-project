const express = require('express');
const { registerUser, getRegisteredUser, loginUser} = require('../controllers/userController.js')
const router = express.Router()
const {authMiddleware} = require('../middlewares/authMiddleware.js')



router.post('/register', registerUser);
router.get('/register', getRegisteredUser);
router.post('/login', loginUser)


module.exports = router;
 