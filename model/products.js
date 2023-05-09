const mongoose = require("mongoose");

//Create schema for products
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    subcategory: [String],
    inventory: {
      type: Number,
      default: 0
    },
    price: Number,
    specifications: Object,
    date: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports =  mongoose.model('Product', productSchema, 'Product');