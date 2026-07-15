require('dotenv').config();
const { Server } = require('socket.io');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, { 
    cors: { origin: [allowedOrigin] } 
});

// Lookup dictionary for online users
const userSocketMap = {}; 

// Helper function to find a specific user's socket ID (Fixed typo & brackets)
function getReceiverSocketId(userId) {
    return userSocketMap[userId]; 
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    // 1. User connects: Save their socket ID (Fixed typo)
    if (userId) userSocketMap[userId] = socket.id;

    // Broadcast the updated online users list to everyone
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    
    // 2. User disconnects: Clean them up out of the dictionary
    socket.on("disconnect", () => {
        if (userId) delete userSocketMap[userId];
        
        // Broadcast the new list now that someone left
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = {
    io,
    app,
    server,
    getReceiverSocketId
};