const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const clientModel = require("../models/clientModel");
const vendorModel = require("../models/vendorModel");
const driverModel = require("../models/driverModel");

exports.getUser = async (req, res) => {
  try {
    const data = await userModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await userModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertUser = async (req, res) => {
  const { username, password, userRole } = req.body;
  let isAdmin = false;
  if (userRole === "admin") {
    isAdmin = true;
  }
  const data = new userModel({ username, password, userRole: userRole || null, isAdmin });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await userModel.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await userModel.findByIdAndDelete(id);
    res.json({ message: `Document with ${id} has been deleted.` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const data = await productModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const data = await productModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertProduct = async (req, res) => {
  const { name, image, description, wholesalePrice, retailerPrice, otherPrice } = req.body;
  const product = new productModel({
    name,
    image,
    description,
    wholesalePrice,
    retailerPrice,
    otherPrice
  });

  try {
    const savedProduct = await product.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await productModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await productModel.findByIdAndDelete(id);
    res.json(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const data = await orderModel.findById(req.params.id).populate('products.product').populate('driver').populate('client');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const data = await orderModel.find({}).populate('products.product').populate('driver').populate('client');
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.insertOrder = async (req, res) => {
  console.log(req.body)
  const {
    dateOrder,
    dateExpected,
    paymentType,
    products,
    client,  
    driver,
    // prixTotal,
} = req.body;

  let prixTotal = 0;

  if (!Array.isArray(products)) {
    return res.status(400).json({ message: "Le champ 'products' doit être un tableau." });
  }

  for (let item of products) {
      const product = await productModel.findById(item.product);
      prixTotal += product.wholesalePrice * item.quantity;
  }

  const data = new orderModel({
    dateOrder,
    dateExpected,
    paymentType,
    products,
    client,  // Ajoutez ceci
    driver,  // Ajoutez ceci
    prixTotal
});
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await orderModel.findByIdAndUpdate(id, updatedData, options);
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await orderModel.findByIdAndDelete(id);
    res.json(`Order with reference ${data._id} has been deleted.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const data = await clientModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const data = await clientModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertClient = async (req, res) => {
  const { name, address, contact, tel, mail, type, defaultDriver } = req.body;
  const data = new clientModel({
    name,
    address,
    contact,
    tel,
    mail,
    type,
    defaultDriver,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await clientModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await clientModel.findByIdAndDelete(id);
    res.json(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.getVendor = async (req, res) => {
  try {
    const data = await vendorModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const data = await vendorModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertVendor = async (req, res) => {
  const { name, surname, tel, mail, orders, user } = req.body;
  const vendor = new vendorModel({ name, surname, tel, mail, orders, user });

  try {
    const savedVendor = await vendor.save();

    if (user) {
      const user2 = await userModel.findById(user);
      if (!user2) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      user2.refId = savedVendor._id;
      user2.onModel = 'Vendor';
      await user2.save();
    }

    res.status(200).json(savedVendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.updateVendor = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await vendorModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendorId = req.params.id;

    // Trouver le chauffeur pour obtenir l'ID de l'utilisateur associé
    const vendor = await vendorModel.findById(vendorId);
    if (vendor && vendor.user) {

      console.log(`Found vendor with user ID: ${vendor.user}`); // Log the user ID

      // Réinitialiser le rôle de l'utilisateur associé à 'null'
      const updatedVendor = await userModel.findByIdAndUpdate(vendor.user, { $set: { userRole: null, refId: null } }, { new: true });

      console.log(`Updated vendor: `, updatedVendor); // Log the updated user
    } else {
      console.log(`No user associated with vendor ID: ${vendorId}`); // Log if no user is associated
    }

    // Supprimer le chauffeur
    await vendorModel.findByIdAndDelete(vendorId);

    res.json(`Chauffeur avec l'ID ${vendorId} a été supprimé.`);
  } catch (error) {
    console.error("Error in deleteVendor:", error); // Log the error
    res.status(400).json({ message: error.message });
  }
};

exports.getDriver = async (req, res) => {
  try {
    const data = await driverModel.findById(req.params.id);
    res.json(data);
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const data = await driverModel.find({});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.insertDriver = async (req, res) => {
  const { name, tel, mail, isActif, orders, clients, user } = req.body;
  const driver = new driverModel({ name, tel, mail, isActif, orders, clients, user });
  console.log(user);
  console.log(req.body);

  try {
    const savedDriver = await driver.save();

    if (user) {
      const user2 = await userModel.findById(user);
      if (!user2) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      user2.refId = savedDriver._id;
      user2.onModel = 'Driver';
      user2.userRole = 'driver';
      await user2.save();
    }

    res.status(200).json(savedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



exports.updateDriver = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await driverModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const driverId = req.params.id;

    // Mettre à jour tous les clients qui ont ce chauffeur comme chauffeur par défaut
    await clientModel.updateMany({ defaultDriver: driverId }, { $unset: { defaultDriver: 1 } });

    // Trouver le chauffeur pour obtenir l'ID de l'utilisateur associé
    const driver = await driverModel.findById(driverId);
    if (driver && driver.user) {
      console.log(`Found driver with user ID: ${driver.user}`); // Log the user ID

      // Réinitialiser le rôle de l'utilisateur associé à 'null'
      const updatedUser = await userModel.findByIdAndUpdate(driver.user, { $set: { userRole: null, refId: null } }, { new: true });

      console.log(`Updated user: `, updatedUser); // Log the updated user
    } else {
      console.log(`No user associated with driver ID: ${driverId}`); // Log if no user is associated
    }

    // Supprimer le chauffeur
    await driverModel.findByIdAndDelete(driverId);

    res.json(`Chauffeur avec l'ID ${driverId} a été supprimé.`);
  } catch (error) {
    console.error("Error in deleteDriver:", error); // Log the error
    res.status(400).json({ message: error.message });
  }
};




exports.getAllUnassignedClients = async (req, res) => {
  try {
    const clients = await clientModel.find({ defaultDriver: null });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.assignClientsToDriver = async (req, res) => {
  try {
    const driverId = req.params.driverId;
    const clientIds = req.body.clients;

    const driver = await driverModel.findById(driverId);
    if (!driver) {
        return res.status(404).send({ message: 'Chauffeur non trouvé' });
    }

    // Mettre à jour les clients précédemment associés pour supprimer ce chauffeur
    await clientModel.updateMany(
      { defaultDriver: driverId },
      { $set: { defaultDriver: null } }
    );

    // Mettre à jour les clients sélectionnés pour ajouter ce chauffeur
    await clientModel.updateMany(
      { _id: { $in: clientIds } },
      { $set: { defaultDriver: driverId } }
    );

    driver.clients = clientIds;
    await driver.save();

    res.status(200).send({ message: 'Clients assignés avec succès' });
  } catch (error) {
    res.status(500).send({ message: 'Erreur serveur', error });
  }
};



exports.getDriverWithClients = async (req, res) => {
  try {
    const driverId = req.params.id;
    const driver = await driverModel.findById(driverId);  // Utilisez driverModel ici
    const clients = await clientModel.find({ defaultDriver: driverId });  // Utilisez clientModel ici
    res.json({ driver, clients });
    console.log("getDriverWithClients called with ID:", req.params.id);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeClientsFromDriver = async (req, res) => {
  try {
      const driverId = req.params.driverId;
      const clientIdsToRemove = req.body.clients;

      const driver = await Driver.findById(driverId);
      driver.clients = driver.clients.filter(clientId => !clientIdsToRemove.includes(clientId.toString()));
      await driver.save();

      res.status(200).json({ message: 'Clients removed successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error removing clients', error });
  }
};

exports.getUsersWithoutRole = async (req, res) => {
  try {
    const users = await userModel.find({ userRole: null });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsersWithoutRole = async (req, res) => {
  try {
    const users = await userModel.find({ userRole: null });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserRole = async (req, res, next) => {
  const userId = req.params.id;
  const { role } = req.body;

  try {
      const user = await userModel.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found." });
      }

      user.userRole = role;
      await user.save();

      res.status(200).json({ message: "Role updated successfully." });
  } catch (error) {
      next(error);
  }
};