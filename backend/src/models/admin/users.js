const mongoose = require('mongoose');
const User = mongoose.Schema({
    UserID:{
        type:String,
        required:true
    },
    Credential:{
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
},
{
    timestamps: true,
});

const Users = mongoose.model('Users', User)

module.exports = Users;