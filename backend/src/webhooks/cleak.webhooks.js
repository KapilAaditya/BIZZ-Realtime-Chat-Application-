require("dotenv").config();
const express = require("express");
const User = require("../model/user.js"); // Handled standard CJS mapping
const { verifyWebhook } = require("@clerk/backend/webhooks");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("=== WEBHOOK HIT ===");
  try {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!signingSecret) {
      console.error("❌ Error: Missing CLERK_WEBHOOK_SIGNING_SECRET environment variable");
      res.status(503).json({ message: "Webhook secret is not provided" });
      return;
    }

    // Clerk's verifier strictly expects a Web Request object with the raw body buffer
    const payload = Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body);
    console.log("📦 Payload prepared length:", payload.length);

    const request = new Request("http://internal/webhooks/clerk", {
      method: "POST",
      headers: new Headers(req.headers),
      body: payload,
    });

    console.log("🔑 Attempting cryptographic verification...");
    // Throws an error immediately if the signature has been altered or doesn't match
    const evt = await verifyWebhook(request, { signingSecret });
    console.log("✅ Verification successful! Event Type:", evt.type);

    // 1. Sync created or updated users to MongoDB
    if (evt.type === "user.created" || evt.type === "user.updated") {
      const u = evt.data;
      console.log("👤 Processing user data for Clerk ID:", u.id);

      const email =
        u.email_addresses?.find((e) => e.id === u.primary_email_address_id)?.email_address ??
        u.email_addresses?.[0]?.email_address;

      const fullName =
        [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username || email?.split("@")[0];

      console.log("💾 Writing to MongoDB...");
      
      // Replaced { new: true } with { returnDocument: 'after' } to fix deprecation warning
      const savedUser = await User.findOneAndUpdate(
        { clerkId: u.id },
        { clerkId: u.id, email, fullName, profilePic: u.image_url },
        { returnDocument: 'after', upsert: true, setDefaultsOnInsert: true },
      );
      console.log("🎉 User successfully synced in DB:", savedUser._id);
    }

    // 2. Remove deleted users from MongoDB
    if (evt.type === "user.deleted") {
      if (evt.data.id) {
        await User.findOneAndDelete({ clerkId: evt.data.id });
        console.log("🗑️ User deleted from DB:", evt.data.id);
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("❌ CRITICAL ERROR: Webhook verification failed or data corrupted:", error);
    res.status(400).json({ message: "Webhook verification failed" });
  }
});

// Export using CommonJS syntax
module.exports = router;