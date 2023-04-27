const multer = require('multer');
const path = require('path');
const fs = require('fs')
const config = require('./config')
const imagesPath = config.upload + '/images'
const videoPath = config.upload + '/videos'
const audioPath = config.upload + '/audio'
const { makeToken } = require('./jwt')
const storge = multer.diskStorage({
    destination: function (req, file, cb) {
        const extensionName = path.extname(file.originalname.toLowerCase());
        const token = makeToken();
        const htmlPath = config.upload + '/' + token;
        checkTypes(extensionName, htmlPath, cb)
        req.htmlPath = htmlPath;
    },
    filename: function (req, file, cb) {
        const token = makeToken();
        cb(null, token + '-' + file.originalname);

    }

})


exports.uploadSlides = multer({
    fileFilter: function (req, file, cb) {
        const extensionName = path.extname(file.originalname.toLowerCase());
        if (filters(extensionName))
            cb(null, true)
        else cb(null, false)

    },
    storage: storge,
    limits: { fileSize: 500 * 1024 * 1024 }// 50mb max 
});

function checkTypes(extname, dirPath, cb) {
    if (extname == '.zip') {
        checkFolders(dirPath)
        cb(null, dirPath)

    } else if (extname == '.png' || extname == '.jpg' || extname == '.jpeg' || extname == '.gif' || extname == '.pdf' || extname == '.svg') {

        checkFolders(imagesPath)
        cb(null, imagesPath)
    }
    else if (extname == '.mp4' || extname == '.wmv' || extname == '.x-flv' || extname == '.avi' || extname == '.webm' || extname == '.mkv' || extname == '.mov' || extname == '.avchd') {
        checkFolders(videoPath)
        cb(null, videoPath)

    }
    else if (extname == '.mp3' || extname == '.ogg' || extname == '.mpeg' || extname == '.aif') {
        checkFolders(audioPath)
        cb(null, audioPath)

    }
    else cb(new Error('Unknown or Unsportted extension ' + extname))
}

function checkFolders(dirPath) {
    if (!fs.existsSync(dirPath))
        fs.mkdirSync(dirPath)
}

function filters(extname) {
    const isValidType = (extname == '.png' || extname == '.zip' || extname == '.jpg' || extname == '.jpeg'
        || extname == '.gif' || extname == '.pdf' || extname == '.svg' || extname == '.mp4'
        || extname == '.wmv' || extname == '.x-flv' || extname == '.avi' || extname == '.webm'
        || extname == '.mkv' || extname == '.mov' || extname == '.avchd' || extname == '.mp3'
        || extname == '.ogg' || extname == '.mpeg' || extname == '.aif');
    return isValidType;
}