const express = require("express");
const cors = require("cors");
require("dotenv/config"); 

const fs = require("fs");
const path = require("path");

const { clerkMiddleware } = require("@clerk/express");

const User = require("./model/user");
const { connectDB } = require("./lib/db");
const Job = require("./lib/cron");

const clerkWebhook = require("./webhooks/cleak.webhooks");

const PORT = process.env.PORT || 5000; // Added fallback port
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

const app = express(); 

// Crucial: The webhook route uses express.raw BEFORE any global express.json() parsers run
app.use("/api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebhook);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.get("/{*any}", (req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
  });
}

server.listen(PORT, () => {
  connectDB();
  console.log("Server is up and running on PORT:", PORT);

  if (process.env.NODE_ENV === "production") job.start();
});