const express = require("express");
const cors = require("cors");
require("dotenv/config"); 

const fs = require("fs");
const path = require("path");

const { clerkMiddleware } = require("@clerk/express");

const User = require("./models/user.model");
const { connectDB } = require("./lib/db");
const job = require("./lib/cron");

const clerkWebhook = require("./webhooks/cleak.webhooks");
const authRoutes = require("./routes/auth.route");

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

// Crucial: The webhook route uses express.raw BEFORE any global express.json() parsers run
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Serves the client-side SPA production build
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  // Fix: Corrected the catch-all routing syntax from '/{*any}' to '*'
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => {
      if (err) next(err);
    });
  });
}

server.listen(PORT, () => {
  connectDB();
  console.log("Server is up and running on PORT:", PORT);

  if (process.env.NODE_ENV === "production") job.start();
});