const jwt = require('jsonwebtoken');

const generateToken = (id) =>{
    return jwt.sign({id},"EMRSOFTWARE", {
        expiresIn: 30,
    })
};

// console.log(generateToken('ACAHS'));
module.exports= generateToken;
