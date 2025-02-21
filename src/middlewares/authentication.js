"use strict";

const Token = require("../models/token");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  req.user = null;

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      // SIMPLE TOKEN:
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      if (tokenData) req.user = tokenData.userId;
    } else if (tokenKey[0] == "Bearer") {
      // JWT:
      const accessData = jwt.verify(tokenKey[1], process.env.ACCESS_KEY);
      req.user = await User.findOne({ _id: accessData._id });
    }
  }

  next();
};
