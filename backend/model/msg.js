const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reciverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String
    },
    image: {
        type: String
    },
    video: {
        type: String
    }
}, { timestamps: true },)


const Message = mongoose.model('Message', msgSchema)

module.exports = Message

