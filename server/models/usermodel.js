const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    FirstName:{
        type: String,   
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    mobileNo: {
        type: Number,
        required: true,
        validate:{
            validator: function (value){
                return /^\d{10}$/.test(value)
            },
            message:'Mobile number must be 10 digits long.'
        },
        unique: true
    },
    email:{
        type: String,
        required: true,
        validate: {
            validator: function(value){
                return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)
            },
            message: 'Invalid email format.'
        }
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        }
    },
    loginId:{
        type: String,
        required: true,
        validate: {
            validator: function (value){
                return /^[a-zA-Z0-9]{8,18}$/.exec(value) !== null
            },
            message: 'Login ID must be  8-18 characters long and alphanumeric.'
        },
        unique: true
    },
    password:{
        type: String,
        required: true,
        validate:{
            validator: function (value){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)
            },
            message: 'Password must be at least 6 characters long, Including 1 uppercase, 1 lowercase, and 1 special character.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('User', userSchema)