const mongoose = require('mongoose');
const appointments = mongoose.Schema({
    AppointmentID:{
            type:String,
            required:true,
            unique:true
    },
    Status:{
        type:String,
        required:true,
        default:"REQUESTED"
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
        phone: {
            type: Number,
            required: true,
        },
        Gender:{
            type:String,
            required:true,
        },
    },
    Disease:{
        Symptoms:{
            type:String,
            required:true
        },
        Description:{
            type:String,
            required:true,
        }
    },
    Warden:{
        Name:{
            type:String,
            required:true
        },
        EmployeeID:{
            type:String,
            required:true
        }
    }
},
{
    timestamps: true,
});

const Appointments = mongoose.model('appointments', appointments)

module.exports = Appointments;