const mongoose = require('mongoose');

// Define the OTP schema
const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    expireAt: {
        type: Date,
        required: true,
        index: { expires: '0' }  // This creates a TTL index for automatic expiration
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// Export the OTP model
module.exports = mongoose.model('OTP', otpSchema);