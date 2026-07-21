const express = require("express");
const router = express.Router();

const { 
  getUsersForSidebar, 
  getConversationForSidebar, 
  getMessages, 
  sendMessage 
} = require("../controller/message.controller.js"); 

const { protectRoute } = require("../middleware/auth.middle.js");
const { upload } = require("../middleware/image.middle.js");

// Static routes FIRST
router.get("/users", protectRoute, getUsersForSidebar);
router.get("/conversations", protectRoute, getConversationForSidebar);
router.get("/conversation", protectRoute, getConversationForSidebar); // Alias for safety

// Dynamic routes LAST
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.single("media"), sendMessage);

module.exports = router;