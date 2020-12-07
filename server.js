const express  = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const User = require('./Models/User');

app.listen(PORT);

app.use(bodyParser.urlencoded({extended: true}));





mongoose.connect('mongodb+srv://Meet-up:PIVIANST05A@eksamensopgave.uyuzl.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true });

// her requiere jeg fra min routes mappe, men den her linje skriver jeg ud. HUSK DENNE KODE!!
// const usersRoutes = require('./routes/users')

// denne kode skulle meget gerne have at min css er statisk
app.use('/View', express.static('View'));

// get req til at forbinde med mit mit index.html side 
app.get('/sign-up', function(req, res ){
    res.sendFile(__dirname + "/View/Index.html")
})
// get req til at forbinde med mit sign-in.html side 
app.get('/', function(req, res){
    res.sendFile(__dirname + "/View/sign-in.html")
})

app.get('/updateUser', function(req, res){
    res.sendFile(__dirname + "/View/user.html")
})




// get req over alle users
app.get('/allUsers', (req, res, next)=>{
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
                       url: 'http://localhost:3001/' + doc._id
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


// POST REQ SERVER EKSEMPEL SCREEN
app.post("/", function(req, res){
    const newUser = new User ({
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
    newUser.save();
    res.redirect("/updateUser")
});



// get req på en bestemt user 
app.get('/:userId', function(req, res, next){
    const id = req.params.userId;
    User.findById(id)
    .select()
    .exec()
    .then(doc => {
        console.log("from database", doc);
        if(doc) {
            res.status(200).json({
                user: doc,
                request: {
                    type: 'GET',
                    description: 'DIRECT LINK TO ALL THE USERS',
                    url: 'http://localhost:3001/allUsers/' 
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
app.patch('/:userId',function(req, res, next){
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
app.delete ('/:userId', function(req, res, next){
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


// her tillader jeg at alle client har adgang til mit rest API ved brug af '*'
// dvs at i mit app.use tillader browser til at benytte mit API og sørger for at vi ikke får CORS fejl, ved brug af "res.header"
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', '*');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

// routes som skal håndtere request --- DENNE KODER SKAL JEG HUSKE AT TILFØJE IGEN
// app.use(usersRoutes);

// når jeg får en error senere i min kode, er det fedt at kunne håndtere det med noget javascript, og den derfor skriver en 404 error ud. 
// det min app.use gør er at hvis jeg ikke har nogle endpoints/request, fx /users, ved jeg at den skal skrive en fejl
app.use((req, res, next) => {
    const error = new Error ('Not found')
    error.status = 404;
    next(error);
})

// den her middleware, bliver brugt, hvis der sker en anden type fejl, end min 404
// denne type fejl kan fx ske når vi behandler data i min database. 
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message 
        }
    });
});


console.log("I got my server to run, and thats amaziiin!")