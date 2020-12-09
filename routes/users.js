const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// her importere jeg min User skema fra min model/user

const userControllers = require('../Controllers/users');

// det her er en get req på min users, og her får jeg alle informationer om alle mine users, via min users_get_all
// som jeg importere via min userController
router.get('/', userControllers.users_get_all);

// det her er en post req på min users, og her får jeg postet alle informationer om alle mine users, via min users_post_all
// som jeg importere via min userController
router.post('/', userControllers.user_post);

//dette skulle være min post router til min login funktion som jeg ikke har kunne få til at fungere. 
router.post('/login', userControllers.login_post)

//fremgangsmåden er det samme for de næste endpoints
router.get('/:userName', userControllers.userName_get);

router.patch('/:userName', userControllers.userName_patch);

router.delete('/:userName', userControllers.userName_delete);


module.exports = router; 
