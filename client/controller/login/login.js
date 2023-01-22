const asyncHandler = require("express-async-handler");
const path = require('path');

const renderLogin  = asyncHandler(async (req, res, next) => {  
    res.render('Login/login', { title: 'Hello', message: 'Hello there!' })
})

module.exports = {
    renderLogin
}
