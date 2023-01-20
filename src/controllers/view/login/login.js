const asyncHandler = require("express-async-handler");
const path = require('path');

const renderLogin  = asyncHandler(async (req, res, next) => {  
    var options = {
        root: path.resolve('./src/views/Login/')
    };

    var fileName = 'login.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    })
})

module.exports = {
    renderLogin
}
