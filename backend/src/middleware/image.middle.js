const multer = require('multer')

const MAX_FILE_SIZE = 25*1024*1024 // 25MB

const upload = multer({
    storage : multer.memoryStorage(),
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter :(req,file,cb)=>{
        const isImage = file.mimetype.startsWith("image/");
        const isVideo = file.mimetype.startsWith("video/");

        if(!isImage && !isVideo){
            cb (new Error("only Image and video uploads are allowed"))
            return
        }
        cb(null,true)
    }
})
module.exports = {upload}