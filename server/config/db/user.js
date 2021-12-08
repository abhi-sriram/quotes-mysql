const db = require("../db");
const uuid = require('uuid');
const passwordHash = require('../password_hash');

async function createUser(email,password){
    try{
        //email check
        if(!passwordHash.validateEmail(email)){
            return {
                code:400,
                msg:'Failed to create user',
                err:'Invalid email'
            }
        }
        const hash = passwordHash.hashPassword(password);
        
        const uid = uuid.v4();
        const sql = `INSERT INTO user(uid,email,hash,salt) VALUES (?,?,?,?)`;
        await db.query(sql,[uid,email,hash.hash,hash.salt]);
        return{
            code:200,
            msg:'User created',
            uid:uid
        }
    }catch(err){
        console.error(err);
        return{
            code:400,
            msg:'Failed to create user',
            err:err.message
        }
    }
}

async function loginUser(email,password){
    try{
        //email check
        if(!passwordHash.validateEmail(email)){
            return {
                code:400,
                msg:'Failed to create user',
                err:'Invalid email'
            }
        }
        const user = await db.query(`SELECT * FROM user WHERE email=? LIMIT 1`,[email]);
        if(user.length==0){
            return {
                code:400,
                msg:'Failed to Login',
                err:`User doesn't exist with email ${email}`
            }
        }
        if(!passwordHash.checkPassword(password,user[0].salt,user[0].hash)){
            return {
                code:400,
                msg:'Failed to Login',
                err:"Incorrect password"
            }
        }
        return{
            code:200,
            msg:'User logged in',
            uid:user[0].uid
        }
    }catch(err){
        console.error(err);
        return{
            code:400,
            msg:'Failed to create user',
            err:err.message
        }
    }
}

module.exports = {
    createUser,
    loginUser
}