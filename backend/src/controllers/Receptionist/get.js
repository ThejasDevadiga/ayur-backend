const generateToken = require('../../utils/generateToken')
const asyncHandler = require("express-async-handler");
const patientData = require('../../models/Patient/PatientDataSchema')
const EmployeeShema = require('../../models/Employee/EmployeeDataScheme')
const consultants = require('../../models/Consultant/consultantList')
const Appointment = require('../../models/Receptionist/Appointments')
const Wardens = require('../../models/wardens/wardensList')
const TimeSlot = require('../../models/Patient/TimeSlots')

const availableDoctor  = asyncHandler(async (req, res, next) => {
    const {requestedId} = req.body.requestedId;
    const {filter,projection} = req.body;
    if (!filter && !projection) {
        throw new Error("Filter and projection are required")
    }
    try {
        const result = await consultants.find({filter},{projection})
        if (result.length>0){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else if (result.length==0){
            throw new Error("No data found in the waiting list")
        }
        else{
            throw new Error("Error while finding waiting patient ")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            data:error.message,
            token:generateToken(requestedId)
        })
    }
})

const EmployeeData  = asyncHandler(async (req, res, next) => {
    const {requestedId} = req.body;
    const {filter,projection} = req.body
    if (!filter && !projection) {   
        throw new Error("Filter Projection  not found")
    }
    try {
        const result = await EmployeeShema.find({filter},{projection})
        if (result){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else{
            throw new Error("Data not found")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            data: error.message,
            token:generateToken(requestedId)
        })
    }
})

const ReqAppointmentsList  = asyncHandler(async (req, res, next) => {
    const {requestedId} = req.body;
    if (requestedId) {   
        throw new Error("request id not found")
    }
    try {
        const result = await Appointment.find({Status:"REQUESTED"})
        if (result){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else{
            throw new Error("Data not found")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            data: error.message,
            token:generateToken(requestedId)
        })
    }
})

const AppAppointmentsList  = asyncHandler(async (req, res, next) => {
    const {requestedId} = req.body;
    if (requestedId) {   
        throw new Error("request id not found")
    }
    try {
        const result = await Appointment.find({Status:"APPROVED"})
        if (result){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else{
            throw new Error("Data not found")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            data: error.message,
            token:generateToken(requestedId)
        })
    }
})

const AvailableTimeSlots  = asyncHandler(async (req, res, next) => {
    const {requestedId} = req.body.requestedId;
    
    if (requestedId) {
        throw new Error(" RequestedId is required")
    }
    try {
        const result = await TimeSlot.find({Status:"Free"},{projection})
        if (result.length>0){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else if (result.length==0){
            throw new Error("No data found in the timeslots list")
        }
        else{
            throw new Error("Error while finding timeslots patient ")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            data:error.message,
            token:generateToken(requestedId)
        })
    }
})


const WardenDetails  = asyncHandler(async (req, res, next) => {
    const {requestedId} = req.body.requestedId;
    const {filter,projection} = req.body;
    if (!filter && !projection) {
        throw new Error("Filter and projection are required")
    }
    try {
        const result = await Wardens.find({filter},{projection})
        if (result.length>0){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else if (result.length==0){
            throw new Error("No data found in the waiting list")
        }
        else{
            throw new Error("Error while finding waiting patient ")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            data:error.message,
            token:generateToken(requestedId)
        })
    }
})





const getPatientData = asyncHandler(async (req, res) => {
    const {requestedId,filter,projection} = req.body;
    if (!requestedId && !filter && !projection) {
        throw new Error(" Requesting Id, Filter, projections are  required")
    }
    try {
        const result = await patientData.find({filter},{projection})
        if (result ==[]){
            throw   new Error("No data found ")
        }
        else if (result){
            res.status(200).json({
                acknowledged: true,
                data: result,
                token:generateToken(requestedId)
            })
        }
        else{
           throw new Error("Error while finding the patientData")
        }
    }
    catch (error) {
        res.status(400).json({
            acknowledged: true,
            message: error.message,
            token:generateToken(requestedId)
        })
    }
})


module.exports = {getPatientData,
  availableDoctor,
    EmployeeData,
    ReqAppointmentsList,
    AppAppointmentsList,
    AvailableTimeSlots,
    WardenDetails
}

