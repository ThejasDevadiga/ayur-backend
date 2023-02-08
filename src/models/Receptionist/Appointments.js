const mongoose = require('mongoose');
const appointments = mongoose.Schema({
    AppointmentID:{
            type:String,
            required:true,
            unique:true
    },
    PatientID:{
        type:String,
        required:true,
    },
    Status:{
        type:String,
        default:"REQUESTED"
    },
    Timing:{
        date:{
            type:Date,
            required:true
        },
        time:{
            type:String,
            required:true
        }
    },
    Doctor:{
        doctorID:{
            type:String,
            required:true
        },
        doctorName:{
            type:String,
            required:true
        },
        department:{
            type:String,
            required:true
        }
    },
    Disease:{
        Symptoms:{
            type:Array,
            required:true
        },
        Description:{
            type:String,
            default:"nothing",
        }
    },
    Warden:{
        WardenName:{
            type:String,
            required:true
        },
        WardenID:{
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