const mongoose = require('mongoose');


const employeeSchema = new mongoose.Schema( {
    firstName:{ 
        type: String,
        required: true,
        trim: true
    },
    lastName: { 
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        unique: true,
    },
   
    email: {
        type: String,
        lowercase: true,
        unique: true,
        // 'valid email': [validateEmail, 'Please fill a valid email address'],
        trim: true
                                                
    },
                         
    password: {
        type: String,
        trim: true
    },
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true,
        unique: true
    },
    isDeleted : false
  
},
 { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema)