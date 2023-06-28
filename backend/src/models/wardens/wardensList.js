const mongoose = require('mongoose');
const WardenList = mongoose.Schema({
    Basic:{
        Name:{
            type:String,
            required:true
        },
        Phone:{
            type:String,
            required:true
        }
    },
    Hostel:{
        HostelName:{
            type:String,
            required:true,
        },
        WardenId:{
            type:String,
            required:true,
            unique:true
        } 
    },
   
    EmpID:{
        type:String,
        required:true,
        unique:true
    }
},
{
    timestamps: true,
});

const WardenLists = mongoose.model('WardenLists', WardenList)

module.exports = WardenLists;