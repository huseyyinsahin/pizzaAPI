"use strict";

const nodemailer = require("nodemailer");

module.exports = function (to, title, message) {
  //* GoogleMail (gmail.com)
  //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "*************",
      pass: "*************",
    },
  });

  transporter.sendMail(
    {
      from: "******************",
      to: to,
      subject: title,
      text: message,
      html: message,
    },
    function (error, success) {
      success ? console.log("SUCCESS:", success) : console.log("ERROR:", error);
    }
  );
};
