const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName:{ 
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        // 'valid email': [validateEmail, 'Please fill a valid email address'],
        trim: true
                                                
    },
                         
    password: {
        type: String,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "LGBTQ"] //"falana" will give an error
    },
    Age: {
         type: Number,
    required: true
    },
    AadharNumber:{
        type: String,
        required: true
  
},
},
 { timestamps: true });

module.exports = mongoose.model('User', userSchema)