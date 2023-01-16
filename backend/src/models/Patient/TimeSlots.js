const mongoose = require('mongoose');
const TimeSlot = mongoose.Schema({
    Fromtime:{
        type:Date,
        required:true,
        unique:true
    },
    Range:{
        type:Number,
        required:true,
        default:15
    },
    Status:{
        type:String,
        required:true,
        default:"Free"
    },
    PatientID:{
        type:String,
        required:true
    }
},
{
    timestamps: true
});

const TimeSlots = mongoose.model('TimeSlot', TimeSlot)

module.exports = TimeSlots;