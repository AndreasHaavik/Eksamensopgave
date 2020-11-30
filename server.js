const express  = require('express');
const API = express();
const PORT = process.env.PORT || 3000;

API.listen(PORT);
const usersRoutes = require('./routes/users');

 
API.use('/users', usersRoutes);

// når jeg får en error senere i min kode, er det fedt at kunne håndtere det med noget javascript, og den derfor skriver en 404 error ud. 
API.use((req, res, next) => {
    const error = new Error ('Not found')
    error.status = 404;
    next(error);
})
// hvis den ikke lytter til 404 error.status vil den kaste en error 500 
API.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


console.log("I got my server to run, and thats amaziiin!")