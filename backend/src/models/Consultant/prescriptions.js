const mongoose = require('mongoose');
const Prescription = mongoose.Schema({
    PrescriptionID:{
        type:String,
        required:true,
        unique:true   
    },
     
    patientID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    consultantID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Employee"
    },
    AppointmentID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"appointment"
    },
    drugList:[{  
                drugName:{
                    type:String,
                    required:true,
                },
                drugQuantity:{
                    type:String,
                    required:true,
                },
                drugTiming:{
                    type:String,
                    required:true,
                }
    }],
    prescriptions:{
        type:String,
        
    },
},
{
    timestamps: true,
});

const Prescriptions = mongoose.model('Prescription', Prescription)

module.exports = Prescriptions;
