const mongoose = require('mongoose');
const receptioninstList = mongoose.Schema({
    EmployeeID:{
        type:String,
        required:true,
        unique:true
    },
    Name:{
        type:String,
        required:true,
    },
    Status:{
        type:String,
        required:true,
    }
},
{
    timestamps: true,
});


const ReceptioninstList = mongoose.model('ReceptioninstList', receptioninstList)

module.exports = ReceptioninstList;