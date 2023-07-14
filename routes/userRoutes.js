const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/all-users',isAuthenticated,getAllUsers);
router.post('/register',registerController);
router.post('/login',loginController);

module.exports=router;