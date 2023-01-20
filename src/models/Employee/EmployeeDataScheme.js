const mongoose = require('mongoose');
const employeeShema = mongoose.Schema({
    EmployeeID:{
        type:String,
        required:true,
        unique:true
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
            type: String,
            required: true,
        },
        Email: {
            type: String,
        },
        Phone: {
            type: Number,
            required: true,
        },
        Gender:{
            type:String,
            required:true,
        },
        Age:{
            type:Number,
            required:true,
        },
        Address: {
                type:String,
                required:true,
        },
        City: {
            type: String,
            required: true,
        },
        State: {
            type: String,
            required: true,
        },
        Country: {
            type: String,
            required: true,
        },
        Zip: {
            type: String,
            required: true,
        }, 
    },
    Department:{
        Name:{
            type:String,
            required:true
        },
        DepartmentID:{
            type:String,
            required:true
        },
    },
    Designation:{
        type:String,
        required:true
    },
     
},
{
    timestamps: true,

});

const Employee = mongoose.model('Employee', employeeShema)

module.exports = Employee;