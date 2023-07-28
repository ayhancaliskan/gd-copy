const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router
  .route("/login")
  .get((req, res) => res.send("Page de login"))
  .post(userController.loginUser);

router.route("/logout").post(userController.logoutUser);

module.exports = router;