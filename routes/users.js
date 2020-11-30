const express = require('express');
const router = express.Router();


const userControllers = require('../Controllers/users');
// det her er en get req på min users, og her får jeg alle informationer om alle mine users, via min users_get_all
// som jeg importere via min userController
router.get('/', userControllers.users_get_all);

// det her er en post req på min users, og her får jeg postet alle informationer om alle mine users, via min users_post_all
// som jeg importere via min userController
router.post('/', userControllers.users_post_all);

//fremgangsmåden er det samme for de næste endpoints
router.get('/:userId', userControllers.userId_get);


router.patch('/:userId', userControllers.userId_patch);

router.delete('/:userId', userControllers.userId_delete);



module.exports = router; 