require('dotenv').config();
const express = require('express');
const connectDB = require('./lib/db.js'); 
const job = require('./lib/cron.js');
const { clerkMiddleware } = require('@clerk/express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { app, server } = require('./lib/socket.js');

const PORT = process.env.PORT || 5000; 

// 1. Allow both local development and deployed origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean);

// 2. Global Middlewares
app.use("/api/webhooks/clerk", express.raw({ type: 'application/json' }), require("./webhooks/cleak.webhooks.js")); 
app.use(express.json());
app.use(clerkMiddleware());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy violation"));
    }
  },
  credentials: true
}));

// 3. Health Check Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ msg: "OK IT IS WORKING" });
});

// 4. API Routes
app.use("/api/auth", require("./routes/auth.js"));

// FIXED: Listen to both /api/messages (plural) and /api/message (singular)
app.use("/api/messages", require("./routes/message.js"));
app.use("/api/message", require("./routes/message.js")); 

// 5. Static Asset Handling
const publicDir = path.join(process.cwd(), "public");
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    app.get("{*splat}", (req, res) => {
        res.sendFile(path.join(publicDir, "index.html"));
    });
}

// 6. Boot Server
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server listening on http://localhost:${PORT}`);
    });
    if (process.env.NODE_ENV === 'development') {
        job.start();
        console.log("Cron job started in development mode");
    }
});