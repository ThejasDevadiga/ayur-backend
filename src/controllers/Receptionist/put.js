const PatientShema = require('../../models/Patient/PatientDataSchema')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");

const generateId = require('../../utils/GenerateId')

const updatePatientData = asyncHandler(async (req, res, next) => {
    const {
        requestedId,
        PatientId,
        updateBasic,
        updateDocument,
        updateDisease,
    } = req.body
    try{
        const Findresult = await PatientShema.findOne({PatientID:PatientId})
    // console.log(Findresult);
        if (!Findresult){
        res.status(400).json({
            acknowledged: false,
            data: "Patient not found!",
            token:generateToken(requestedId)
        })
    } 
    const updatedBasic = Object.assign(Findresult.Basic,updateBasic)
    const updatedDisease = Object.assign(Findresult.Disease,updateDisease)
    var UpdatedDocs = Object.values(Findresult.Documents)
    UpdatedDocs.push(updateDocument)
        const Updateresult = await PatientShema.updateOne(
                                                     {PatientID:PatientId},
                                                    {
                                                        $set:
                                                            {
                                                                Basic:updatedBasic,
                                                                Disease:updatedDisease,
                                                                Documents:UpdatedDocs
                                                            }
                                                    })
        
        if(Updateresult){
            res.status(201).json({
                acknowledged: true,
                PatientId: Updateresult.PatientId,
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


const updateTimeSlots  = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        acknowledged : true,
        message : 'Data Added Successfully',
        
})
})


module.exports = {updatePatientData,updateTimeSlots}