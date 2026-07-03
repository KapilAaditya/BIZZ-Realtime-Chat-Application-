const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    clerkid: {
        type: String,
        required: true,
        unique: true
    }, fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: ""
    }
}, { timestamps: true },)// yeh btata hai kab a user bana or kab update hua  genrated automaticall by mongoos
const User = mongoose.model('User', userSchema)

module.exports = User;