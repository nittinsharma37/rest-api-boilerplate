const productController = require('./controller/productController');
const orderController = require('./controller/orderController');
let router = require('express').Router();


router.get('/products', productController.getProducts);


router.post('/orders', orderController.placeOrder);


router.get('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});



router.post('*', (req, res) => {
    res.status(404).json({ message: 'Not Found' });
});





module.exports = router;