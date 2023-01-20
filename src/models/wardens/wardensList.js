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
        Name:{
            type:String,
            required:true,
        },
        WardenId:{
            type:String,
            required:true,
            unique:true
        } 
    },
    EmployeeID:{
        type:String,
        required:true
    }, 
    
    wardenPassword:{
        type:String,
        required:true,
    },
    HostelName:{
        type:String,
        required:true,
    }
},
{
    timestamps: true,
});

const WardenLists = mongoose.model('WardenLists', WardenList)

module.exports = WardenLists;