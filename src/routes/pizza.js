"use strict";

const router = require("express").Router();

const pizza = require("../controllers/pizza");

const { isAdmin } = require("../middlewares/permissions");

const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: "./upload",
    filename: function (req, file, returnCallback) {
      returnCallback(null, Date.now() + "_" + file.originalname);
    },
  }),
});

router
  .route("/")
  .get(pizza.list)
  .post(isAdmin, upload.array("image"), pizza.create);

router
  .route("/:id")
  .get(pizza.read)
  .put(isAdmin, upload.array("image"), pizza.update)
  .patch(isAdmin, upload.array("image"), pizza.update)
  .delete(isAdmin, pizza.delete);

module.exports = router;
