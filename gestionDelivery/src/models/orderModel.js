const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  dateOrder: {
    type: Date,
    default: Date.now()
  },
  dateExpected: {
    type: Date,
  },
  adresse: {
    type: String,
  },
  paymentType: {
    type: String,
    enum: ["cash", "credit", "virement", "bancontact"],
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: Number,
  }],
  prixTotal: { 
    type: Number,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true,
},
});

const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
