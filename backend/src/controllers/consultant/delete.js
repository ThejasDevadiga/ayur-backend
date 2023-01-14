 const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const ConsultPatient = require('../../models/Patient/ConsultPatientList')
 

const DeletePrescription  = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        acknowledged : true,
        message : 'Data Added Successfully',
        token: generateToken(requestedId)
})
})
 


module.exports = {
    DeletePrescription
}