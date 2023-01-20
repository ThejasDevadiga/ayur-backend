const mongoose = require('mongoose');
const Admin = mongoose.Schema({
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


const Admins = mongoose.model('AdminList', Admin)

module.exports = Admins;