const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema( {
    
    Name:{
        type: String,
        required: true
    },
    Logo:{
        type: String,
    },

    email: {
        type: String,
        lowercase: true,
        unique: true,
        // 'valid email': [validateEmail, 'Please fill a valid email address'],
        trim: true
                                                
    },
    website:{
        type: String
    }
                         
   
},
 { timestamps: true });

module.exports = mongoose.model('admin', adminSchema)