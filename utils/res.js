const notification = require('../models/notification');
const { errorHandler } = require('./error');
async function response(req, res, next) {
    try {

        const { res_object, model_name } = req;
        if (res_object.notify)
            await notification.create({
                data: res_object.message,
                type: model_name
            })
        return res.status(200).json({ ...res_object });
    }
    catch (err) {
        next(err)
    }
}

module.exports = { response }

