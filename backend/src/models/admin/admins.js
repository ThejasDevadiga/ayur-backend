const mongoose = require('mongoose');
const Admin = mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    EmployeeID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required:true,
        unique:true
    },
    Hospital:{
        Name:{
            type:String,
            required:true,
        },
        Branch:{
            type:String,
            required:true,
        }
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