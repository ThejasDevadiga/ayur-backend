const mongoose = require('mongoose');
const ConsultPatientShema = mongoose.Schema({
    PatientID:{
        type:String,
        required:true,
        unique:true
    },
    Status:{
        type:String,
        required:true
    } 
},
{
    timestamps: true
});

const ConsultingPatient = mongoose.model('ConsultPatient', ConsultPatientShema)

module.exports = ConsultingPatient;