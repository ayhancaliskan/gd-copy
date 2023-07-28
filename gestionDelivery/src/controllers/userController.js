const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const orderModel = require("../models/orderModel");

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username }).exec();

    if (!user || user.password !== password) {
      return res.status(401).send("Identifiants invalides.");
    }

    req.session.isLoggedIn = true;
    req.session.userRole = user.userRole;

    if (user.userRole === 'driver') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const orders = await orderModel.find({
        driver: user.refId,
        dateOrder: { $gte: today, $lt: tomorrow },
      });

      return res.status(200).json({ userRole: user.userRole, user, orders });
    } else {
      return res.status(200).json({ userRole: user.userRole, user });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logoutUser = (req, res) => {
  req.session.isLoggedIn = false;
  res.redirect("/login");
};
