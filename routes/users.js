const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'handling Get request to /users'
    });
});

router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: 'handling Post request to /users'
    });
});

module.exports = router; 