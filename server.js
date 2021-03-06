const express  = require('express');
const app = express();
const PORT = 3004;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors")
app.use(cors())

app.listen(PORT);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://Meet-up:PIVIANST05A@eksamensopgave.uyuzl.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true }, { useUnifiedTopology: true });


const userRouter = require('./routes/users')
app.use("/users", userRouter);


app.post ("/login", function(req, res, next){
    User.findOne(
        {username: req.body.username,
        password: req.body.password}
    )
        if (User.findOne({username: req.body.username, password: req.body.password}) == null) 
        res("User not found")
        
        else res.redirect("/View/userInformation.html") 
});


// her tillader jeg at alle client har adgang til mit rest API ved brug af '*'
// dvs at i mit app.use tillader browser til at benytte mit API og sørger for at vi ikke får CORS fejl, ved brug af "res.header"
// denne kode kan implementeres hvis jeg ikke havde hentet cors module ned på min server
/*
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', '*');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});
*/

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