const express = require('express');
const router = express.Router();

// det her er en get req på min users, og her får jeg alle informationer om alle mine users
router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'handling Get request to /users'
    });
});
// det her er en post req på min users, og her får jeg postet alle informationer om alle mine users
router.post('/', (req, res, next)=>{
    res.status(200).json({
        message: 'handling Post request to /users'
    });
});
// hvis jeg vil have information om en enkelt user, via hans userID, skal jeg også bruge en get req,
// men her er der en anden fremgangsmåde med et if, else statement
//----//
// inden min IF statement laver jeg en variable id som jeg bruger i min IF statement, som indikere,
// at hvis min id = Andreas99 skrives den første besked ud, men hvis man ID ikke er Andreas99, skrives den anden besked ud. 

router.get('/:userId', (req, res, next)=>{
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
});



module.exports = router; 