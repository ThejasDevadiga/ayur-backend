const mongoose = require('mongoose');
const User = mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    }
},
{
    timestamps: true,
});

const Users = mongoose.model('Users', User)

module.exports = Users;