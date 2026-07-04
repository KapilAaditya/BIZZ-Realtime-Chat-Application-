require("dotenv").config()
const express = require("express");
const User = require("../model/user.js"); // Removed .js extension for standard CJS
const { verifyWebhook } = require("@clerk/backend/webhooks");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("=== WEBHOOK HIT ===");
  try {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!signingSecret) {
      console.error("❌ Error: Missing signing secret environment variable");
      res.status(503).json({ message: "Webhook secret is not provided" });
      return;
    }

    const payload = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body);
    console.log("📦 Payload prepared length:", payload.length);

    const request = new Request("http://internal/webhooks/clerk", {
      method: "POST",
      headers: new Headers(req.headers),
      body: payload,
    });

    console.log("🔑 Attempting verification...");
    const evt = await verifyWebhook(request, { signingSecret });
    console.log("✅ Verification successful! Event Type:", evt.type);

    if (evt.type === "user.created" || evt.type === "user.updated") {
      const u = evt.data;
      console.log("👤 Processing user data for Clerk ID:", u.id);

      const email =
        u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address ??
        u.email_addresses?.[0]?.email_address;

      const fullName =
        [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || email?.split("@")[0];

      console.log("💾 Writing to MongoDB...");
      const savedUser = await User.findOneAndUpdate(
        { clerkId: u.id },
        { clerkId: u.id, email, fullName, profilePic: u.image_url },
        { new: true, upsert: true, setDefaultsOnInsert: true },
      );
      console.log("🎉 User successfully synced in DB:", savedUser._id);
    }

    if (evt.type === "user.deleted") {
      if (evt.data.id) {
        await User.findOneAndDelete({ clerkId: evt.data.id });
        console.log("🗑️ User deleted from DB:", evt.data.id);
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ CRITICAL ERROR IN WEBHOOK PROCCESSING:", error);
    res.status(400).json({ message: "Webhook verification failed" });
  }
});

// Export using CommonJS syntax
module.exports = router;