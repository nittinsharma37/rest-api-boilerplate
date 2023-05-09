
const mongoose = require("mongoose");


// Create schema for orders
const orderSchema = new mongoose.Schema({
    customerName: String,
    customerEmail: String,
    products: [{
      name: String,
      price: Number,
      quantity: Number,
      specifications: Object
    }],
    orderTotal: Number,
    orderDate: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create model for orders
  module.exports = mongoose.model('Order', orderSchema, 'Order');