const mongoose = require('mongoose');
const patientShema = mongoose.Schema({
    PatientID:{
            type:String,
            required:true,  
    },
    Status:{
        type:String,
        required:true,
        default:"Waiting"
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
        Age:{
            type:Number,
            required:true,
        }
    },
    
    Issues:{
        DiagnosisTime:{
            type:String,
            default: ''
        },
        DiagnosisDate:{
            type:String,
            default: ''
        },
        Category:{
            type:String,
            default:'',
        },
        Description:{
            type:String,
            default: ''
        },
        Symptoms:{
            type:String,
            default:''
        }
    },
    Warden:{
        Name:{
            type:String,
            required:true,

        }
    }
},
{
    timestamps: true,

});

const Patient = mongoose.model('Patient', patientShema)

module.exports = Patient;