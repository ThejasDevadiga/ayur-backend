const mongoose = require('mongoose');
const ConsultantList = mongoose.Schema({
    ConsultantID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
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