const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    clerkId: { // <-- Changed from clerkid to clerkId (Capital I)
        type: String,
        required: true,
        unique: true
    }, 
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;