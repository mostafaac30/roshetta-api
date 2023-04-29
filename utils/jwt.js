const jwt = require("jsonwebtoken");
const USER = require("../models/patient");
const config = require("./config");

function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }
    // req.userId = decoded.id;
    let user = await USER.findById(decoded.id).populate("role");
    console.log(user);
    if (!user || user.deleted) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

function createToken(id, secret = config.secret) {
  const token = jwt.sign({ id }, secret);
  return token;
}

// must roles Array popluted

function verifyGlobalToken(token, secret = config.secret) {
  try {
    const verified = jwt.verify(token, secret);
    console.log(verified, "Verifying true ");
    return verified;
  } catch (e) {
    console.log(e);
    console.log("Verifying false ");
    return false;
  }
}
function createGlobalToken(data, expires = "365d", secret = config.secret) {
  try {
    const token = jwt.sign({ data }, secret, { expiresIn: expires });
    console.log(token, "token");
    return token;
  } catch (e) {
    console.log(e, "error");
    return false;
  }
}
makeToken = function () {
  const token = randomBytes(12).toString("hex");
  return token;
};
module.exports = {
  verifyToken,
  createToken,
  createGlobalToken,
  verifyGlobalToken,
  makeToken,
};
