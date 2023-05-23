const { port } = require("../utils/config");
const createError = require("http-errors");

async function editUserInfo(req, res, next) {
  try {
    const { body, files, user, hostname, protocol, Model, query, params } = req;
    const { ID } = params;
    const { populate } = query;

    console.log(port);
    let image =
      files && files.length
        ? `${protocol}://${hostname}${":" + port}/` + files[0].path
        : body.avatar;
    let editUser = await Model.findByIdAndUpdate(
      ID,
      { ...body, image },
      { new: true }
    )
      .populate(populate)
      .exec();
    console.log(image);
    req.res_object = { result: editUser };
    next();
  } catch (err) {
    return next(createError(err));
  }
}

module.exports = {
  editUserInfo,
};
