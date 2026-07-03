require("dotenv").config();

const express = require("express");
const User = require("../model/user");

const { verifyWebhook } = require("@clerk/backend/webhooks");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const signingSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

    if (!signingSecret) {
      return res.status(500).json({
        message: "Webhook secret missing",
      });
    }

    const payload = Buffer.isBuffer(req.body)
      ? req.body.toString("utf8")
      : String(req.body);

    const request = new Request("http://localhost/api/webhook/clerk", {
      method: "POST",
      headers: new Headers(req.headers),
      body: payload,
    });

    const evt = await verifyWebhook(request, {
      signingSecret,
    });

    if (
      evt.type === "user.created" ||
      evt.type === "user.updated"
    ) {
      const u = evt.data;

      const email =
        u.email_addresses?.find(
          (e) => e.id === u.primary_email_address_id
        )?.email_address ||
        u.email_addresses?.[0]?.email_address;

      const fullName =
        [u.first_name, u.last_name]
          .filter(Boolean)
          .join(" ") ||
        u.username ||
        email?.split("@")[0];

      await User.findOneAndUpdate(
        {
          clerkId: u.id,
        },
        {
          clerkId: u.id,
          email,
          fullName,
          profilePic: u.image_url,
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    if (evt.type === "user.deleted") {
      if (evt.data.id) {
        await User.findOneAndDelete({
          clerkId: evt.data.id,
        });
      }
    }

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);

    res.status(400).json({
      message: "Webhook verification failed",
    });
  }
});

module.exports = router;