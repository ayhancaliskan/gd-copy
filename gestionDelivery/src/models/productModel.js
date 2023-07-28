const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
    wholesalePrice: {
        type: Number,
    },
    retailerPrice: {
        type: Number,
    },
    otherPrice: {
        type: Number,
    }
});

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;
