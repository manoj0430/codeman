const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
//router to Sign Up page
router.get('/signup', usersController.signUp);
//router to Sign In page
router.get('/signin', usersController.signIn);

router.post('/create', usersController.create);

router.post('/create-session', usersController.createSession);

router.get('/logout', usersController.logout);

module.exports = router;