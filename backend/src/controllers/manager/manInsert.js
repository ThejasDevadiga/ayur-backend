const EmployeeShema = require('../../models/Employee/EmployeeDataScheme')
const generateId = require('../../utils/GenerateId')
const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const consultants = require('../../models/Consultant/consultantList')
const Receptionists = require('../../models/Receptionist/ReceptionList')



const insertEmployeeData = asyncHandler(async (req, res) => {
    const { 
      requestedId,
        EmployeeId,
        Basic,
        Role,
        Speciality,
    } = req.body;
    const findEmployee = await EmployeeShema.findOne({EmployeeId});

    if (findEmployee) {
      throw new Error("Employee already exists")
    }
    try{
    const Empresult = await EmployeeShema.create({
        EmployeeId: generateId('EMP'),
        Basic:Basic,
        Speciality:Speciality,
        Role:Role
    });
    if (Empresult) {
      if(Role=="receptionist"){
        const findReceptionist = await Receptionists.findOne({EmployeeId});
        if (findReceptionist) {
          throw new Error("Consultant already exists")
        }
        const Recpresult = await Receptionists.create({
            EmployeeId: Empresult.EmployeeId,
            Department:"Hospital",
            Status:"Ready",
        });
        if (Recpresult) {
          res.status(201).json({
            acknowledged: true,
            EmployeeId: Recpresult.EmployeeId,
            message:"Data inserted successfully",
            token:generateToken(requestedId)
          });
      }
      else{
        throw new Error("Error while inserting receptionist list!!")
      }
    }
      else if(Role=="consultant"){
        const findConsultants = await consultants.findOne({EmployeeId});
        if (findConsultants) {
          throw new Error("Consultant already exists")
        }
        const Consresult = await consultants.create({
            EmployeeId: Empresult.EmployeeId,
            Department:"Hospital",
            Status:"Ready",
        });
        if (Consresult) {
          res.status(201).json({
            acknowledged: true,
            EmployeeId: Consresult.EmployeeId,
            message:"Data inserted successfully",
            token:generateToken(requestedId)
          });
      }
      else{
        throw new Error("Error while inserting consultant list!!")
      }
    }
    } else {
      throw new Error("Error while inserting data")
    }
    }catch(err){
      res.status(400).json({
        acknowledged : true,
        token:generateToken(requestedId),
        message : err.message
      })
    }
});
module.exports = {insertEmployeeData};
