const orderModel = require('../model/order');
let orderController = {};


orderController.placeOrder = async function(req,res, next){
    try {
        const { customerName, customerEmail, products } = req.body;
        
        // Calculate the order total
        const orderTotal = products.reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0);
    
        // Create a new order
        const order = new orderModel({
          customerName,
          customerEmail,
          products,
          orderTotal
        });
        
        // Save the order to the database
        const savedOrder = await order.save();
        
        res.status(201).json(savedOrder);
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }

}

module.exports  = orderController;
