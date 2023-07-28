const express = require("express");
const router = express.Router();
const vendorController = require("../controllers/vendorController");

router.route("/orders").get(vendorController.getAllOrders);



router
  .route("/orders/:id")
  .get(vendorController.getOrder)
  .post(vendorController.insertOrder)
  .delete(vendorController.deleteOrder);

router.route("/orders/:id/deliver")
  .patch(vendorController.updateDeliveryDate);

module.exports = router;
