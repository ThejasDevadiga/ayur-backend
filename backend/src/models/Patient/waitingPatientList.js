const mongoose = require('mongoose');
const WaitingPatients = mongoose.Schema({
    PatientID:{
        type:String,
        required:true,
        unique:true,   
    },
    Status:{
        type:String,
        required:true
    }
},
{
    timestamps: true,
});


const WaitingPatientList = mongoose.model('WaitingPatientList', WaitingPatients)

module.exports = WaitingPatientList;