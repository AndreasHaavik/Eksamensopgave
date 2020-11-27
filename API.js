const express  = require('express');
const API = express();

const usersRoutes = require('./routes/users');

/*
API.use((req, res, next) =>{
    res.status(200).json({
        message: 'it works!'
    });
});
*/
 
API.use('/users', usersRoutes);

module.exports = API;