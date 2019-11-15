const express = require('express');
const router = express.Router();
const users = require('./../controller/controller');
/**
 * Simple CURD operaion
 * 1. /signup : This is the entry point for registering the user (name, email, password in is mandate) 
 * 2. /login : This is the entry point for loign (email, password in mandate)
 * 3. /profile : This is entry point for fetch user profile.(token is mandate with "x-token")
 * 4. /profile/update : This is entry point for updating profile , (token in header with "x-token", data- which need to update )  
 */
router.post('/signup', users.signup) //for register
router.post('/login', users.login) //
router.get('/profile', users.profile)
router.put('/profile/update', users.update_profile)

module.exports = router;