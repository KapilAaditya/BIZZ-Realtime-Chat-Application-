require('dotenv').config();
const express = require('express');
const connectDB = require('./lib/db'); 
const {clerkMiddleware } = require('@clerk/express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL
const publicDir = path.join(process.cwd(),"public") // it says join the current working directory and find the public folder 
app.use(express.json());
app.use(clerkMiddleware())
app.use(cors({origin:FRONTEND_URL , credentials:true}))

app.get('/health' , (req,res)=>{
    res.status(200).json({msg : " OK IT IS WORKING "})
})
// if the pubic directory exist , serve the static file 
if(fs.existsSync(publicDir)){
    app.use(express.static(publicDir))


    app.get('*',(req,res,next)=>{
        res.sendFile(path.join(publicDir,"index.html"),(err)=>{if(err){next(err)}});
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`The app is listening on http://localhost:${PORT}`);
    });
});