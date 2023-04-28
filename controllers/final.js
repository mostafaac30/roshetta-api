const createError = require("http-errors");
async function final(req, res, next) {
  try {
    const { data, method, path, params } = req;
    const { ID } = params;
    let resource = path.split("/")[1];
    let message = getMessage(method, resource);
    let respond = {
      success: true,
      message: message,
      ...data,
    };
    res.status(200).json(respond);
  } catch (e) {
    console.log(e.message);
    return next(createError(e));
  }
}

function getMessage(method, resource) {
  let message = "";
  switch (method) {
    case "GET":
      message = "";
      break;
    case "POST":
      message = `new ${resource} added`;
      break;
    case "PUT":
      message = `${resource} has been edited`;
      break;
    case "DELETE":
      message = `${resource} has been deleted`;
      break;
  }

  return message;
}

module.exports = {
  final,
};
