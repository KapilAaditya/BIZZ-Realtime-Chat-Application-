require('dotenv').config();
const express = require('express');
const connectDB = require('./lib/db.js'); 
const job = require('./lib/cron.js');
const { clerkMiddleware } = require('@clerk/express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;
const publicDir = path.join(process.cwd(), "public");

// 1. Core Global Middlewares
app.use("/api/webhooks/clerk", express.raw({ type: 'application/json' }), require("./webhooks/cleak.webhooks.js")); 
app.use(express.json());
app.use(clerkMiddleware());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

// 2. Health Endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ msg: " OK IT IS WORKING " });
});

// 3. API Routes (Fixed missing leading slashes '/')
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/message", require("./routes/message.js"));

// 4. Static Asset Handling (Moved to the bottom)
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    // ✅ FIXED: Named wildcard for Express v5 compatibility to serve SPA index.html
    app.get("{*splat}", (req, res) => {
        res.sendFile(path.join(publicDir, "index.html"));
    });
}

// 5. Database Connection & Server Boot
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The app is listening on http://localhost:${PORT}`);
    });
    if (process.env.NODE_ENV === 'development') {
        job.start();
        console.log("Cron job started in development mode");
    }
});