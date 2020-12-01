const express = require('express');
const router = express.Router();
/*-----
// dette nedenstående har jeg tilføjet via dette link
// https://robkendal.co.uk/blog/how-to-build-a-restful-node-js-api-server-using-json-files

const userRoutes = (app, fs) => {
    const dataPath = '../Models/userData.json';
    
    app.get('/', (req,res)=>{
        fs.readFile(dataPath, 'utf8', (err, data)=>{
            if(err){
                throw err;
            }
            res.send(JSON.parse(data));
        });
    });
};

module.exports = userRoutes;
//det slutter hernede
-----*/


const userControllers = require('../Controllers/users');
// det her er en get req på min users, og her får jeg alle informationer om alle mine users, via min users_get_all
// som jeg importere via min userController
router.get('/', userControllers.users_get_all);

// det her er en post req på min users, og her får jeg postet alle informationer om alle mine users, via min users_post_all
// som jeg importere via min userController
router.post('/', userControllers.users_post);

//fremgangsmåden er det samme for de næste endpoints
router.get('/:userId', userControllers.userId_get);


router.patch('/:userId', userControllers.userId_patch);

router.delete('/:userId', userControllers.userId_delete);



module.exports = router; 

