"use strict";

const router = require("express").Router();

router.use("/auth", require("./auth"));

router.use("/user", require("./user"));

router.use("/token", require("./token"));

router.use("/order", require("./order"));

router.use("/pizza", require("./pizza"));

router.use("/topping", require("./topping"));

router.use("/documents", require("./document"));

module.exports = router;
