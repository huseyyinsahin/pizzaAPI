"use strict";

const Order = require("../models/order");
const { UnauthorizedError } = require("../errors/customError");
const order = require("../models/order");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "List Orders"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    if (req.user.isAdmin) {
      const data = await res.getModelList(Order, {}, ["userId", "pizzaId"]);
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Order),
        data,
      });
    } else if (req.user.isActive) {
      const data = await res.getModelList(Order, { userId: req.user._id }, [
        "userId",
        "pizzaId",
      ]);
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(Order, { userId: req.user._id }),
        data,
      });
    }
  },

  create: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Create Order"
        */
    if (req.body.userId == req.user._id) {
      const data = await Order.create(req.body);
      let newData = undefined;

      if (data) {
        newData = await Order.findOne({ _id: data._id }).populate([
          "userId",
          "pizzaId",
        ]);
      }

      res.status(201).send({
        error: false,
        newData,
      });
    } else {
      throw new UnauthorizedError();
    }
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Get Single Order"
        */
    const userValidation = await Order.find({ userId: req.user._id });

    const orderUser = userValidation.some(
      (order) => order._id.toString() == req.params.id
    );

    if (orderUser) {
      const data = await Order.findOne({ _id: req.params.id }).populate([
        "userId",
        "pizzaId",
      ]);

      res.status(200).send({
        error: false,
        data,
      });
    } else {
      throw new UnauthorizedError();
    }
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Update Order"
        */
    const userValidation = await Order.find({ userId: req.user._id });

    const orderUser = userValidation.some(
      (order) => order._id.toString() == req.params.id
    );

    if (orderUser && req.body.userId === req.user._id.toString()) {
      const data = await Order.updateOne({ _id: req.params.id }, req.body, {
        runValidators: true,
      });

      res.status(202).send({
        error: false,
        data,
        new: await Order.findOne({ _id: req.params.id }),
      });
    } else {
      throw new UnauthorizedError();
    }
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Delete Order"
        */
    const userValidation = await Order.find({ userId: req.user._id });

    const orderUser = userValidation.some(
      (order) => order._id.toString() == req.params.id
    );

    if (orderUser) {
      const data = await Order.deleteOne({ _id: req.params.id });

      res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data,
      });
    } else {
      throw new UnauthorizedError();
    }
  },
};
