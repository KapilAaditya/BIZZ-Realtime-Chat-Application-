const mongoose = require("mongoose");
const Message = require("../model/msg.js");
const User = require("../model/user.js");
const { hasImageKitConfig, uploadChatMedia } = require("../lib/imagekit.js");
const { getReceiverSocketId, io } = require("../lib/socket.js");

// Helper to extract the MongoDB user ID safely from request
const getUserId = (req) => {
  if (req.user && req.user._id) return req.user._id;
  if (req.auth && req.auth.userId) return req.auth.userId;
  return null;
};

async function getUsersForSidebar(req, res) {
  try {
    const loggedInUser = getUserId(req);
    if (!loggedInUser) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const filterUser = await User.find({
      _id: { $ne: new mongoose.Types.ObjectId(loggedInUser) },
    }).select("-clerkId");

    res.status(200).json(filterUser);
  } catch (error) {
    console.error("Error in getUsersForSidebar:", error.message);
    res.status(500).json({ msg: "Internal server Error" });
  }
}

async function getConversationForSidebar(req, res) {
  try {
    const loggedInUser = getUserId(req);
    if (!loggedInUser) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const userObjectId = new mongoose.Types.ObjectId(loggedInUser);

    const conversation = await Message.aggregate([
      {
        $match: {
          $or: [{ senderId: userObjectId }, { receiverId: userObjectId }],
        },
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userObjectId] },
              "$receiverId",
              "$senderId",
            ],
          },
          lastMessageAt: { $max: "$createdAt" },
        },
      },
      {
        $sort: { lastMessageAt: -1 }, // Newest at top
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $replaceRoot: { newRoot: { $first: "$user" } },
      },
      {
        $project: { clerkId: 0 },
      },
    ]);

    res.status(200).json(conversation);
  } catch (error) {
    console.error("Error in getConversationForSidebar:", error.message);
    res.status(500).json({ msg: "Internal server Error" });
  }
}

async function getMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const loggedInUser = getUserId(req);

    if (!loggedInUser) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const myId = new mongoose.Types.ObjectId(loggedInUser);
    const peerId = new mongoose.Types.ObjectId(userToChatId);

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: peerId },
        { senderId: peerId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); // Oldest to newest (latest at bottom)

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error.message);
    res.status(500).json({ msg: "Internal server Error" });
  }
}

async function sendMessage(req, res) {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const loggedInUser = getUserId(req);

    if (!loggedInUser) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    let imageurl;
    let videourl;

    if (req.file) {
      if (!hasImageKitConfig()) {
        return res.status(500).json({ msg: "Media upload is not configured" });
      }
      const url = await uploadChatMedia(req.file);

      if (req.file.mimetype.startsWith("video/")) {
        videourl = url;
      } else {
        imageurl = url;
      }
    }

    const newMessage = new Message({
      senderId: new mongoose.Types.ObjectId(loggedInUser),
      receiverId: new mongoose.Types.ObjectId(receiverId),
      text,
      video: videourl,
      image: imageurl,
    });

    await newMessage.save();

    // Socket.io Real-time Event
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId && io) {
      io.to(receiverSocketId).emit("Your_New_MSG", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage:", error.message);
    res.status(500).json({ msg: "Internal server Error" });
  }
}

module.exports = {
  getUsersForSidebar,
  getConversationForSidebar,
  getMessages,
  sendMessage,
};