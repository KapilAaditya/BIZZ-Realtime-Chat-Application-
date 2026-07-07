const express = require("express");
const router = express.Router();
const { requireAuth } = require("@clerk/express"); // Ready for other routes if needed
const User = require("../model/user.js");
const { checkAuth } = require("../controller/auth.controller.js");
const { protectRoute } = require("../middleware/auth.middle.js");

// Pass both middlewares by reference (NO parenthesis)
router.get("/check", protectRoute, checkAuth);

module.exports = router;


/* const express = require("express");
const router = express.Router();
const { requireAuth } = require("@clerk/express");
const User = require("../model/user.js");
const { checkAuth } = require("../controller/auth.controller.js");
const { protectRoute } = require("../middleware/auth.middle.js");

router.get("/check",protectRoute, checkAuth(), async (req, res) => {
    
});

module.exports = router; */