"use strict";

const express = require("express");
const app = express();

/* ------------------------------------------------------- */

require("dotenv").config();
const PORT = process.env?.PORT || 8000;

require("express-async-errors");

/* ------------------------------------------------------- */


/* ------------------------------------------------------- */

app.use("/upload", express.static("./upload"));

app.use("/", require("./src/routes/"));

/* ------------------------------------------------------- */

app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

/* ------------------------------------------------------- */

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */

// require("./src/helpers/sync")();
