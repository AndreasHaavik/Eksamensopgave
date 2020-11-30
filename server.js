const express  = require('express');
const API = express();
const PORT = process.env.PORT || 3000;

API.listen(PORT);
const usersRoutes = require('./routes/users');

 
API.use('/users', usersRoutes);

API.use((req, res, next) => {
    const error = new Error ('Not found')
    error.status = 404;
    next(error);
})

API.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

console.log("I got my server to run, and thats amaziiin!")