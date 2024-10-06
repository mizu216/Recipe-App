const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true // Ensures email are unique
        },
        password: {
            type: String,
            required: true
        },
    },{
        collection:"User"
    }
)

// Create the User model from the schema
mongoose.model('User', userSchema);