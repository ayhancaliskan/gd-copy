const orderModel = require("../models/orderModel");

exports.getOrder = async (req, res) => {
  try {
    const driver = await Driver.findById(req.driverId);

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

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertOrder = async (req, res) => {
  const orderData = req.body;

  const order = new orderModel(orderData);

  try {
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    if (!ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }

    const updatedOrder = await orderModel.findOneAndUpdate(
      { _id: orderId },
      updatedData,
      options
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await orderModel.findByIdAndDelete(id);
    res.send(`Order with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDeliveryDate = async (req, res) => {
  const orderId = req.params.id;
  const { dateDelivered } = req.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    order.dateDelivered = dateDelivered;
    order.state = 'delivered';

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};