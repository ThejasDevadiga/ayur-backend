const asyncHandler = require("express-async-handler");
const path = require('path');

const renderLogin  = asyncHandler(async (req, res, next) => {  
    res.render('Login/login', { title: '', message: 'Hello there!' })
})

const renderdefault = asyncHandler(async (req, res, next) => {  
    res.render('Login/home', { title: '', message: 'Hello there!' })
}) 
module.exports = {
    renderLogin,renderdefault
}
