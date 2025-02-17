"use strict";

const Token = require("../models/token");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      // SIMPLE TOKEN:
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      if (tokenData) req.user = tokenData.userId;
      
    } else if (tokenKey[0] == "Bearer") {
      // JWT:
      jwt.verify(
        tokenKey[1],
        process.env.ACCESS_KEY,
        function (error, accessData) {
          console.log(accessData);
          if (accessData) req.user = accessData;
        }
      );
    }
  }

  next();
};
