const crypto = require('crypto');

function hashPassword(password) { 
     
    // Creating a unique salt for a particular user 
       const salt =  crypto.randomBytes(16).toString('hex');
       // Hashing user's salt and password with 1000 iterations, 
        
       const hash = crypto.pbkdf2Sync(password, salt,  
       1000, 64, `sha512`).toString(`hex`);
       
       return {
           salt,
           hash
       }
   }; 
     
   // Method to check the entered password is correct or not 

function checkPassword(password,dbSalt,dbHash){
    const userHash = crypto.pbkdf2Sync(password,dbSalt,1000,64,`sha512`).toString(`hex`);
    return dbHash===userHash;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = {
    hashPassword,
    checkPassword,
    validateEmail
}