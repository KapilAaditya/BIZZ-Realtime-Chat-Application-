require('dotenv').config();
const ImageKit = require("imagekit");

// Fix: The SDK will instantly throw an error if publicKey and urlEndpoint are missing here
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "temporary_fallback_key", 
    privateKey: process.env.IMAGEKIT_SECRET_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/placeholder"
});

function hasImageKitConfig(){
    return Boolean(process.env.IMAGEKIT_SECRET_KEY);
}

function createFileName(originalName="upload"){
    const safeName = originalName.replace(/[^a-z0-9]/gi, '_');
    return `chat-${Date.now()}-${safeName}`;
}

async function uploadChatMedia(file){
    const fileName = createFileName(file.originalname);
    const result = await imagekit.upload({
        file: file.buffer,
        fileName,
        folder: "/chat"
    });
    return result.url;
}

module.exports = {
    hasImageKitConfig,
    createFileName,
    uploadChatMedia
};