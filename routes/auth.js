var express = require("express");
const { response } = require("../utils/res");
const { Router } = express;
const auth = require("../controllers/auth");
var router = Router();
const modalName = "authentication";

const { signIn, signUp } = auth;
router.post(
  "/sign-up",
  (req, res, next) => {
    req.model_name = modalName;
    next();
  },
  signUp,
  response
);
router.post(
  "/sign-in",
  (req, res, next) => {
    req.model_name = modalName;
    next();
  },
  signIn,
  response
);

module.exports = router;
