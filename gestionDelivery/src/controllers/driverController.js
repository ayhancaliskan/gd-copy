const orderModel = require("../models/orderModel");
const driverModel = require("../models/driverModel");
const ObjectId = require('mongoose').Types.ObjectId;


exports.getOrder = async (req, res) => {
  try {
    const driver = await driverModel.findById(req.driverId);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const orderId = req.params.orderId;

    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    if (!driver.orders.includes(orderId)) {
      return res
        .status(404)
        .json({ message: "Order not found for this driver" });
    }

    const order = await orderModel.findById(orderId);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {

    const driverId = req.params.driverId;

    const driver = await driverModel.findById(driverId).populate('orders');

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    res.status(200).json(driver.orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deliverOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const currentDate = new Date();

    const updateData = {
      deliveredDate: currentDate,
      state: 'delivered'
    };

    const options = { new: true };

    const result = await orderModel.findByIdAndUpdate(id, updateData, options);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
