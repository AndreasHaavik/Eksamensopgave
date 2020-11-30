const express  = require('express');
const API = express();
const PORT = process.env.PORT || 3000;

API.listen(PORT);
const usersRoutes = require('./routes/users');

 
API.use('/users', usersRoutes);

console.log("I got my server to run, and thats amaziiin!")