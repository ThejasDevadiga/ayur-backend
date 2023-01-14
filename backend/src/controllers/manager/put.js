const generateId = require('../../utils/GenerateId')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const EmployeeShema = require('../../models/Employee/EmployeeDataScheme')
 
const updateEmployeeData = asyncHandler(async (req, res, next) => {
    const {
        requestedId,
        EmployeeId,
        updateBasic,
        updateDocument,
        updateSpeciality,
    } = req.body

    try{
        const FoundResult = await EmployeeShema.findOne( {EmployeeId:EmployeeId})
        console.log(FoundResult);
            if (!FoundResult){
            throw new Error("Employee could not be found")
        } 
        const updatedBasic = Object.assign(FoundResult.Basic,updateBasic)
        const updatedSpeciality = Object.assign(FoundResult.Speciality,updateSpeciality)
        var UpdatedDocs = Object.values(FoundResult.Documents,updateDocument)

        const Updatedresult = await EmployeeShema.updateOne(
                                                    {EmployeeId:EmployeeId},
                                                    {
                                                        $set:
                                                            {
                                                                Basic:updatedBasic,
                                                                Documents:UpdatedDocs,
                                                                Speciality:updatedSpeciality
                                                            }
                                                    })
        if(Updatedresult){
            res.status(201).json({
                acknowledged: true,
                EmployeeId: Updatedresult.EmployeeId,
                token:generateToken(requestedId)
                })
            }
        else{
            throw new Error("Error while updating data")
        }
    }
    catch(err){
        res.status(400).json({
          acknowledged : true,
          token:generateToken(requestedId),
          message : err.message
        })
      }
})
 
module.exports  = {
    updateEmployeeData
}
