const mongoose = require('mongoose');
const StaffList = mongoose.Schema({
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


const StaffLists = mongoose.model('StaffList', StaffList)

module.exports = StaffLists;