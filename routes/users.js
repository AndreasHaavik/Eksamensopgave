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
    .select('firstName lastName gender age interests address eMail userName passWord _id')
    .exec()
    .then(docs => {
       const response = {
           count: docs.length,
           users: docs.map(doc => {
               return {
                   firstName: doc.firstName,
                   lastName: doc.lastName,
                   gender: doc.gender,
                   age: doc.age,
                   interests: doc.intersts,
                   address: doc.address,
                   eMail: doc.eMail,
                   userName: doc.userName,
                   passWord: doc.passWord,
                   _id: doc._id,
                   request: {
                       type: 'GET',
                       description: 'GET YOUR USER',
                       url: 'http://localhost:3001/users/' + doc._id
                   }
               }
           })
       };
    //      if (docs.length >= 0 ){
            res.status(200).json(response);
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
            message: 'We have now created a new user successfully!',
            createdUser: {
                firstName: result.firstName,
                lastName: result.lastName,
                gender: result.gender,
                age: result.age,
                interests: result.intersts,
                address: result.address,
                eMail: result.eMail,
                userName: result.userName,
                passWord: result.passWord,
                _id: result._id,  
                request: {
                    type: 'GET',
                    description: 'DIRECT LINK TO YOUR USER',
                    url: 'http://localhost:3001/users/' + result._id
                }
            }
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
    .select('firstName lastName gender age interests address eMail userName passWord _id')
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if(doc) {
            res.status(200).json({
                user: doc,
                request: {
                    type: 'GET',
                    description: 'DIRECT LINK TO ALL THE USERS',
                    url: 'http://localhost:3001/users/' 
                }
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
router.patch('/:userId',(req, res, next)=>{
    const id = req.params.userId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User is updated',
            request: {
                type: 'GET',
                description: 'DIRECT LINK TO ALL THE USERS',
                url: 'http://localhost:3001/users/' + id
            }
        })
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
            res.status(200).json({
                message: 'User is deleted',
                request: {
                    type: 'POST',
                    description: 'CLICK THE LINK TO MAKE A NEW USER',
                    url: 'http://localhost:3001/users/',
                    newUser: {firstName: "String", lastname: "String", gender: "String", age: "Number", interests: "String", address: "String and Number" , eMail: "String and Number", userName: "String and Number", passWord: "String and Number"}
                }
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

