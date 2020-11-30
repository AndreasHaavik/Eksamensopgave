/*
const express = require("express")
const router = express ();
const user = require('//Users/andreashaavik/Desktop/1-Semester/Programmering/Eksamensopgave/Models/User.js')
*/

// det efterfølgende kode, eksportere jeg mine crud endpoints til mine mine routes mappe, for at få mere dybde i min kode
// og fuldfører MVC strukturen. 

const user = require("../Models/User");

exports.users_get_all = (req, res, next)=>{
    res.status(200).json({
        message: 'handling Get request to /users'
    });
}

exports.users_post_all = (req, res, next)=>{
    res.status(200).json({
        message: 'handling Post request to /users'
    });
}
// hvis jeg vil have information om en enkelt user, via hans userID, skal jeg også bruge en get req,
// men her er der en anden fremgangsmåde med et if, else statement
//----//
// inden min IF statement laver jeg en variable id som jeg bruger i min IF statement, som indikere,
// at hvis min id = Andreas99 skrives den første besked ud, men hvis man ID ikke er Andreas99, skrives den anden besked ud. 

exports.userId_get = (req, res, next)=>{
    const id = req.params.userId;
    if(id === "Andreas99"){
        res.status(200).json({
            message:'you have now the userId: Andreas99',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'you have not passed the correct Id. Your Id shoudl be Andreas99'
        });
    }
}

exports.userId_patch = (req, res, next)=>{
    res.status(200).json({
      message: 'Updated userId'  
    });
}

exports.userId_delete = (req, res, next)=>{
    res.status(200).json({
      message: 'Deleted userId'  
    });
}



