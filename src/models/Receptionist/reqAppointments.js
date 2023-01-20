const mongoose = require('mongoose');
const reqAppointment = mongoose.Schema({
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
        Gender:{
            type:String,
            required:true,
        },
        Phone:{
            type:Number,
            required:true,
        },
        DateofBirth:{
            type:Date,
            required:true,
        },
    
    },
    
    Issues:{
        Category:{
            type:String,
            default:'',
        },
        DiagnosisTime:{
            type:String,
            default: ''
        },
        DiagnosisDate:{
            type:String,
            default: ''
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

const ReqAppointment = mongoose.model('reqAppointment', reqAppointment)

module.exports = ReqAppointment;