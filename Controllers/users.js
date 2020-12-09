const User = require("../Models/User.js");
const mongoose = require('mongoose')

exports.users_get_all = function(req, res, next) {
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
    }


// dette faktum er ikke super vigtigt men normal når man har en stauts 201, betyder det "created success status"
exports.user_post =  function(req, res, next){
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
}

exports.login_post = function(req, res, next){
    User.findOne(
        {username: req.body.username,
        password: req.body.password}
    )
        if (User.findOne({username: req.body.username, password: req.body.password}) == null) 
        res("User not found")
        
        else res.redirect("/View/userInformation.html") 
};

// hvis jeg vil have information om en enkelt user, via hans userID, skal jeg også bruge en get req,
// men her er der en anden fremgangsmåde med et if, else statement
//----//
// inden min IF statement laver jeg en variable userName som jeg bruger i min IF statement, som indikere,
// at hvis min userName = Andreas99 skrives den første besked ud, men hvis man userName ikke er Andreas99, skrives den anden besked ud. 

exports.userName_get = function(req, res, next){
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
};

exports.userName_patch = function(req, res, next){
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
}

exports.userName_delete = function(req, res, next){
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
};



