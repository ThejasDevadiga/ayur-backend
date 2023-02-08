const mongoose = require('mongoose');
const patientShema = mongoose.Schema({
    PatientID:{
            type:String,
            required:true,  
    },
    Status:{
        type:String,
        required:true,
        default:"Registered"
    },
    Basic:
    {
        Fname: {
            type: String,
            required: true,
        },
        Mname: {
            type: String,
            default: " "
        },
        Lname: {
            type: String,
            required: true,
        },
        DateOfBirth: {
            type: Date,
            required: true,
        },
        Gender:{
            type:String,
            required:true,
        },
        Phone:{
            type:Number,
            required:true,
        },
        Email:{
            type:String,
            default:"emailAddress"
        },
        Age:{
            type:Number,
            required:true,
        },
        Address:{
            type:String,
            default: " ",
            required:true,
        },
        City:{
            type:String,
            default: " ",
            required:true,
        },
        State:{
            type:String,
            default: "Karnataka",
            required:true,
        },
        Country:{
            type:String,
            default: "India",
            required:true,
        },
        Zip:{
            type:Number,
            default: "123456",
            required:true,
        }
    },
},
{
    timestamps: true,

});

const Patient = mongoose.model('Patient', patientShema)

module.exports = Patient;