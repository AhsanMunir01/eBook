const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email:{
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type : String,
        required : true,
    },
    firstName: {
        type : String,
        required : true,
    },
    lastName: {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
        enum : ['CUSTOMER', 'ADMIN'],
        default : 'CUSTOMER',
    },
},
{
    timestamps : true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;