const mongoose = require('mongoose');
const Prescription = mongoose.Schema({
    patientName:{
        type:String,
        required:true,
    },
    patientID:{
        type:String,
        required:true,
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
        }]
},
{
    timestamps: true,
});

const Prescriptions = mongoose.model('Prescription', Prescription)

module.exports = Prescriptions;
