const mongoose = require('mongoose');
const ConsultPatientShema = mongoose.Schema({
    PatientID:{
        type:String,
        required:true,
        unique:true
    },
    Basic:{
        Name:{
            type:String,
            required:true,
        },
        DateofBirth:{
            type:Date,
            required:true,
        },
        phone:{
            type:Number,
            required:true
        }
    },
    Issues:{
        Symptoms:{
            type:String,
            required:true
        },
        Category:{
            type:String,
            required:true
        },
        Description:{
            type:String,
            required:true
        }
    },
    Prescription:{
        type:String,
        required:true
    } 
},
{
    timestamps: true
});

const ConsultingPatient = mongoose.model('ConsultPatient', ConsultPatientShema)

module.exports = ConsultingPatient;