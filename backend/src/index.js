require("dotenv").config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const { clerkMiddleware } = require("@clerk/express");

const connectDB = require("./lib/db");
const Job = require("./lib/cron");

const clerkWebhook = require("./routes/clerkWebhook");

// import your other routes
// const userRoutes = require("./routes/user");
// const messageRoutes = require("./routes/message");

const app = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

/**
 * Webhook route MUST come before express.json()
 */
app.use(
  "/api/webhook/clerk",
  express.raw({ type: "application/json" }),
  clerkWebhook
);

app.use(express.json());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(clerkMiddleware());

// API routes
// app.use("/api/users", userRoutes);
// app.use("/api/messages", messageRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    message: "Backend is running",
  });
});

if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));

  app.use((req, res, next) => {
    res.sendFile(path.join(publicDir, "index.html"), (err) => {
      if (err) next(err);
    });
  });
} else {
  app.use((req, res) => {
    res.status(404).json({
      message: "Route not found",
    });
  });
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    if (process.env.NODE_ENV === "production") {
      Job.start();
    }
  })
  .catch((err) => {
    console.error(err);
  });