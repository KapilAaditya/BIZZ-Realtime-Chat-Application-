const Message = require("../model/msg.js");
const User = require("../model/user.js");
const { hasImageKitConfig, uploadChatMedia } = require('../lib/imagekit.js');

async function getUsersForSidebar(req, res) {
    try {
        const loggedInUser = req.user._id;
        const filterUser = await User.find({ _id: { $ne: loggedInUser } }).select("-clerkId");
        res.status(200).json(filterUser);
    } catch (error) {
        console.error("Error to getUsersForsidebar", error.message);
        res.status(500).json({ msg: "Internal server Error" });
    }
}

async function getConversationForSidebar(req, res) {
    try {
        const loggedInUser = req.user._id;
        const conversation = await Message.aggregate([
            { $match: { $or: [{ senderId: loggedInUser }, { receiverId: loggedInUser }] } },
            {
                $group: {
                    _id: { $cond: [{ $eq: ["$senderId", loggedInUser] }, "$receiverId", "$senderId"] },
                    lastMessageAt: { $max: "$createdAt" }
                }
            }, 
            {
                $sort: { lastMessageAt: -1 }
            },
            {
                $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" }
            },
            {
                $replaceRoot: { newRoot: { $first: "$user" } }
            },
            {
                $project: { clerkId: 0 }
            }
        ]);
        res.status(200).json(conversation);
    } catch (error) {
        console.error("Error to getConversationForsidebar", error.message);
        res.status(500).json({ msg: "Internal server Error" });
    }
}

async function getMessages(req, res) {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error to getMessages", error.message);
        res.status(500).json({ msg: "Internal server Error" });
    }
}

async function sendMessage(req, res) {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageurl;
        let videourl;

        if (req.file) {
            if (!hasImageKitConfig()) {
                return res.status(500).json({ msg: "Media upload is not configured" });
            }
            const url = await uploadChatMedia(req.file);
            
            // 1. Fixed typo: .startsWith instead of .startWith
            if (req.file.mimetype.startsWith("video/")) {
                videourl = url;
            } else {
                imageurl = url;
            }
        }

        const newMessage = new Message({
            senderId,
            receiverId, // 2. Fixed key spelling typo from reciverId to receiverId
            text,
            video: videourl,
            image: imageurl
        });
        
        await newMessage.save();
        res.status(201).json(newMessage);
        
    } catch (error) {
        console.error("Error to sendMessages", error.message);
        res.status(500).json({ msg: "Internal server Error" });
    }
}

// 3. Added missing function exports
// Ensure this is the ONLY module.exports at the bottom of message.controller.js
module.exports = {
    getUsersForSidebar,
    getConversationForSidebar,
    getMessages,
    sendMessage
};