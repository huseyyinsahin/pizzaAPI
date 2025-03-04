"use strict";

const router = require("express").Router();

const topping = require("../controllers/topping");

const { isAdmin } = require("../middlewares/permissions");

router.route("/").get(topping.list).post(isAdmin, topping.create);

router
  .route("/:id")
  .get(topping.read)
  .put(isAdmin, topping.update)
  .patch(isAdmin, topping.update)
  .delete(isAdmin, topping.delete);

module.exports = router;
