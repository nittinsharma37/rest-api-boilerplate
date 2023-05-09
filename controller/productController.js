const productsModel = require('../model/products');
let productController = {};

productController.getProducts = async function (req, res, next) {

    if (Object.keys(req.query).length === 1 && req.query.category) {
        // Code to handle query with only one parameter
        let category = req.query.category;
        const cacheKey = `products-${category}`;

        
        global.gredis.get(cacheKey, async (err, cachedData) => {
            if (cachedData !== null && typeof cachedData !== 'undefined')  {
              // Return cached data if it exists
            //   console.log(cachedData, "cahcehdh");
            console.log("this is from cache");
              const products = JSON.parse(cachedData);
              res.json(products);
            } else {
              // Fetch data from MongoDB and store it in Redis cache
              const filter = { category };
              // Code to filter products based on other query parameters
              const products = await productsModel.find(filter).select('name price specifications -_id').sort('-date');
              global.gredis.setex(cacheKey, 60, JSON.stringify(products));
              res.json(products);
            }
          });

        

    }else{

        const { name, category, subcategory, price, specifications, inventory, date } = req.query;
    const filter = {};

    if (name) {
        filter.name = { $regex: name, $options: 'i' };
    }

    if (category) {
        filter.category = category;
    }

    if (subcategory) {
        filter.subcategory = { $in: subcategory };
    }

    if (price) {
        const [minPrice, maxPrice] = price.split('-').map(Number);
        filter.price = { $gte: minPrice, $lte: maxPrice };
    }

    if (specifications) {
        const specs = JSON.parse(specifications);
        Object.keys(specs).forEach(key => {
            filter[`specifications.${key}`] = specs[key];
        });
    }

    if (!inventory || inventory === 'true') {
        filter.inventory = { $gt: 0 };
    }

    let query = productsModel.find(filter).select('name price specifications -_id');

    if (date) {
        const [startDate, endDate] = date.split('-').map(d => new Date(d));
        query = query.where('date').gte(startDate).lte(endDate);
    }

    const products = await query.sort('-date');

    console.log(products, "dgbeiovnoieboewoibnoer ");

    res.json(products);

    }

    


}


module.exports = productController;

