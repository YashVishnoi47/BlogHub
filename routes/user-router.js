const express = require('express');
const router = express.Router();
const {registerUser,loginuser} = require('../controllers/user.auth.controller')

router.post('/registerUser',registerUser);
router.post('/loginUser',loginuser);


module.exports = router;