const mongoose = require('mongoose');
const User = mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Designation:{
        type:String,
        require:true,
        default:"-"
    },
    Status:{
        type:String,
        require:true,
        default:'INACTIVE'
    },
    EmployeeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }
},
{
    timestamps: true,
    strictPopulate:false
});

const Users = mongoose.model('Users', User)

module.exports = Users;