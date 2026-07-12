const express = require('express');
const router = express.Router();

// 1. Destructure all 4 validated controller functions
const { 
    getUsersForSidebar, 
    getConversationForSidebar, 
    getMessages, 
    sendMessage 
} = require('../controller/message.controller.js'); 

// 2. Import your route protection middleware and multer storage configs
const { protectRoute } = require('../middleware/auth.middle.js');
const { upload } = require('../middleware/image.middle.js');

// 3. Define the messaging route configurations
router.get('/users', protectRoute, getUsersForSidebar);
router.get('/conversation', protectRoute, getConversationForSidebar);
router.get('/:id', protectRoute, getMessages);
router.post('/send/:id', protectRoute, upload.single("media"), sendMessage);

// 4. Export the configured router instance directly
module.exports = router;