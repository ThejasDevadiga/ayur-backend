const mongoose = require('mongoose');
const drugDetails = mongoose.Schema({
    drugID:{
        type:String, 
        required:true
    },
    drugName:{
        type:String,
        required:true
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
},
{
    timestamps: true,
});

const DrugDetails = mongoose.model('DrugDetails', drugDetails)

module.exports = DrugDetails;