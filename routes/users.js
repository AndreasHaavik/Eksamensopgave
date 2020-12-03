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

const User = require('../Models/User');
// det her er når man skal have alle mine users frem
router.get('/', (req, res, next)=>{
    User.find()
    .exec()
    .then(docs => {
        console.log(docs);
    //      if (docs.length >= 0 ){
            res.status(200).json(docs);
    //       }else {
    //        res.status(404).json({
    //        message: 'no users found'
    //      })
    //  } //---------> man kunne have skrevet ene 404 error hvis der ikke var nogen users, via en if else statement  

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

router.post('/', (req, res, next)=>{
    const user = new User ({
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
    user
    .save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: 'handling Post request to /users',
            createdUser: result
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    });
});


// hvis jeg vil have information om en enkelt user, via hans userID, skal jeg også bruge en get req,
// men her er der en anden fremgangsmåde med et if, else statement
//----//
// inden min IF statement laver jeg en variable id som jeg bruger i min IF statement, som indikere,
// at hvis min id = Andreas99 skrives den første besked ud, men hvis man ID ikke er Andreas99, skrives den anden besked ud. 

// get et bestemt ID route
router.get('/:userId',(req, res, next)=>{
    const id = req.params.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if(doc) {
            res.status(200).json(doc)
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
router.patch('/:userId',(req, res, next)=>{
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error:err
        });
    });
});

// delete route
router.delete ('/:userId',(req, res, next)=>{
    const id = req.params.userId;
    User.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => { 
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router; 

