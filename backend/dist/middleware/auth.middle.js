const { getAuth } = require("@clerk/express");
const User = require("../model/user.js");

async function protectRoute(req, res, next) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" }); // Added return to prevent double responses
        }
        
        const user = await User.findOne({ clerkId: userId });
        if (!user) {
            return res.status(404).json({ msg: "User Profile is Not synced yet" }); // Added return
        }
        
        req.user = user;
        next();
    } catch (err) {
        console.error("error with our servers", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}

module.exports = { protectRoute };