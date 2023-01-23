const asyncHandler = require("express-async-handler");
const path = require('path');

const consultHome  = asyncHandler(async (req, res, next) => {  
    res.render('Consultant/consultant', { title: 'Hello', message: 'Hello there!' })
})

module.exports = {
    consultHome
}
