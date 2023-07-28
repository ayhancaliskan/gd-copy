const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");

router.route("/orders/:driverId").get(driverController.getMyOrders);

router
  .route("/orders/detail/:id")
  .get(driverController.getOrder)
  .patch(driverController.deliverOrder);



module.exports = router;
