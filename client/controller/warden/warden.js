const asyncHandler = require("express-async-handler");
const path = require("path");

const wardenHome = asyncHandler(async (req, res, next) => {
  res.render("Warden/warden", {
    title: "Warden",
    user: "Thejas Devadiga",
    
  })
})


// patientHistory
const patientHistory  = asyncHandler(async (req, res, next) => {  
  res.render('warden/history', { title: 'Hello', message: 'Hello there!' })
})

module.exports = {
  wardenHome,patientHistory
};
