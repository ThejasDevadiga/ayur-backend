const mongoose = require('mongoose');
const TimeSlot = mongoose.Schema({
    slot:{
        type:Number,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        default:"busy",
    },
    

},
{
    timestamps: true
});
TimeSlot.index({slot:1,date:1},{unique: true})

const TimeSlots = mongoose.model('TimeSlot', TimeSlot)

module.exports = TimeSlots;