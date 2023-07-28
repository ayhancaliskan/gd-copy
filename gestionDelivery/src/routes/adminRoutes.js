const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");



router
  .route("/users")
  .get(adminController.getAllUsers)
  .post(adminController.insertUser);

router
  .route("/users/:id")
  .get(adminController.getUser)
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser);

router.put('/users/:id/role', adminController.updateUserRole);

router
  .route("/products")
  .get(adminController.getAllProducts)
  .post(adminController.insertProduct);

router
  .route("/products/:id")
  .get(adminController.getProduct)
  .patch(adminController.updateProduct)
  .delete(adminController.deleteProduct);



router.route("/orders")
  .get(adminController.getAllOrders)
  .post(adminController.insertOrder);

router
  .route("/orders/:id")
  .get(adminController.getOrder)
  .patch(adminController.updateOrder)
  .delete(adminController.deleteOrder);


router
  .route("/clients")
  .all((req, res, next) => {
    console.log("Request to /clients endpoint with method:", req.method);
    next();
  })
  .get(adminController.getAllClients)
  .post(adminController.insertClient);

router
  .route("/clients/:id")
  .all((req, res, next) => {
    console.log("Request to /clients endpoint with method:", req.method);
    next();
  })
  .get(adminController.getClient)
  .patch(adminController.updateClient)
  .delete(adminController.deleteClient);

router
  .route("/vendors")
  .get(adminController.getAllVendors)
  .post(adminController.insertVendor);

router
  .route("/vendors/:id")
  .get(adminController.getVendor)
  .patch(adminController.updateVendor)
  .delete(adminController.deleteVendor);


// Routes pour les chauffeurs

router.get('/unassignedClients', adminController.getAllUnassignedClients);

router
  .route("/drivers")
  .all((req, res, next) => {
    console.log("Request to /drivers endpoint with method:", req.method);
    next();
  })
  .get(adminController.getAllDrivers)
  .post(adminController.insertDriver);

router.route("/drivers/:driverId/assign-clients").put(adminController.assignClientsToDriver);
router.route("/drivers/:driverId/remove-clients").put(adminController.removeClientsFromDriver);

router.get('/drivers/:id/with-clients', adminController.getDriverWithClients);



router
  .route("/drivers/:id")
  .all((req, res, next) => {
    console.log("Request to /drivers endpoint with method:", req.method);
    next();
  })
  .get(adminController.getDriver)
  .patch(adminController.updateDriver)
  .delete(adminController.deleteDriver);

router.get('/users-without-role', adminController.getUsersWithoutRole);

module.exports = router;
