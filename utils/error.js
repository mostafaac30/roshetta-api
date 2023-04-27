const notify = require('../models/notification')
async function errorHandler(err, req, res, next) {
    try {
        if (err && 500 > err.code >= 400)
            await notify.create({
                data: err.message,
                object: err,
                type: 'error'
            })
        return res.status(600 > err.code > 400 ? err.code : 400).json({ message: err.message, err: err, success: false });
    }
    catch (err) {
        console.log(err);
        return res.json({ message: err.message, err })
    }
}

module.exports = { errorHandler }