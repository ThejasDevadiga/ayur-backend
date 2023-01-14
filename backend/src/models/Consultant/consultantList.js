const mongoose = require('mongoose');
const ConsultantList = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    EmployeeID:{
        type:String,
        required:true,
        unique:true
    },
    Department:{
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


const ConssultantList = mongoose.model('ConsultantList', ConsultantList)

module.exports = ConssultantList;