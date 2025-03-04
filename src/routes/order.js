"use strict";

const router = require("express").Router();

const order = require("../controllers/order");

const { isLogin } = require("../middlewares/permissions");

router.use(isLogin);
router.route("/").get(isLogin, order.list).post(order.create);

router
  .route("/:id")
  .get(order.read)
  .put(order.update)
  .patch(order.update)
  .delete(order.delete);

module.exports = router;
