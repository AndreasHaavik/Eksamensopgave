
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')



/*-------------------------(VIGTIG KODE TIL MINE CONTROLLERS)
const userControllers = require('../Controllers/users');
// det her er en get req på min users, og her får jeg alle informationer om alle mine users, via min users_get_all
// som jeg importere via min userController
router.get('/', userControllers.users_get_all);

// det her er en post req på min users, og her får jeg postet alle informationer om alle mine users, via min users_post_all
// som jeg importere via min userController
router.post('/', userControllers.users_post);

//fremgangsmåden er det samme for de næste endpoints
//router.get('/:userId', userControllers.userId_get);

//router.patch('/:userId', userControllers.userId_patch);

//router.delete('/:userId', userControllers.userId_delete);
/*----------------(VIGTIG KODE TIL MINE CONTROLLERS TIL SENERE)*/

// her importere jeg min User skema fra min model/user
const User = require('../Models/User.js');
const {db} = require('../Models/User.js')


// get req over alle users
router.get('/', (req, res, next)=>{
    User.find()
    .select('firstName lastName gender age interests address eMail userName passWord _id')
    .exec()
    .then(docs => {
       res.status(200).json(docs)
         if (docs.length >= 0 ){
            res.status(200).json(response);
           }else {
            res.status(404).json({
                message: 'no users found'
            });
        }   
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// dette faktum er ikke super vigtigt men normal når man har en stauts 201, betyder det "created success status"
// dette er når man laver / creater en bruger 



// POST REQ SERVER EKSEMPEL SCREEN
router.post("/", (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        age: req.body.age,
        interests: req.body.interests,
        address: req.body.address,
        eMail: req.body.eMail,
        userName: req.body.userName,
        passWord: req.body.passWord
    });
    user.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: "Created your user sucessfully",
        createdUser: user
    });
});

router.post("/login", (req, res, next) => {
    User.findOne(
        {username: req.body.username,
        password: req.body.password}
    )
        if (User.findOne({username: req.body.username, password: req.body.password}) == null) 
        res("User not found")
        
            else location.href = "http://127.0.0.1:3001/View/UserInfomation.html" //nyt 
});



// hvis jeg vil have information om en enkelt user, via hans userID, skal jeg også bruge en get req,
// men her er der en anden fremgangsmåde med et if, else statement
//----//
// inden min IF statement laver jeg en variable id som jeg bruger i min IF statement, som indikere,
// at hvis min id = Andreas99 skrives den første besked ud, men hvis man ID ikke er Andreas99, skrives den anden besked ud. 



// get req på en bestemt user 
router.get('/:userName', function(req, res, next){
    const userName = req.params.userName;
    User.findOne({userName: userName})
    .select()
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if(doc) {
            res.status(200).json({
                user: doc
            })
        } else {
            res.status(404).json({
                message: 'no valid id number register'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});


// Patch / update route
router.patch('/:userName',function(req, res, next){
    const userName = req.params.userName;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({userName: userName}, { $set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User is updated',
            })
        })
        .catch(err => { 
            console.log(err);
            res.status(500).json({
                error: err
        });
    });
})

// delete route
router.delete ('/:userName', function(req, res, next){
    const userName = req.params.userName;
    User.remove({userName: userName})
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'User is deleted',
            });
        })
        .catch(err => { 
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router; 

