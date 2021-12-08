const express = require('express');
const router = express.Router();
const user = require('../config/db/user');

router.post('/signup',async(req,res,next)=>{
    try{
        const createUser = await user.createUser(req.body.email,req.body.password);
        if(createUser.code==200){
            res.json(createUser);
        }else{
            res.status(createUser.code).json(createUser);
        }
    }catch(err){
        return{
            code:400,
            msg:'Failed to create user',
            err:err.message
        }
    }
});

router.post('/login',async(req,res,next)=>{
    try{
        const loginUser = await user.loginUser(req.body.email,req.body.password);
        if(loginUser.code==200){
            res.json(loginUser);
        }else{
            res.status(loginUser.code).json(loginUser);
        }
    }catch(err){
        return{
            code:400,
            msg:'Failed to create user',
            err:err.message
        }
    }
});

module.exports = router;