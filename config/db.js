
const mongoose = require("mongoose");
let connectToDb = async function() {
    console.log("Connecting to mongoDB...");
    try {
    
      await mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true });


      console.log("Connected to mongoDB!");
    } catch (error) {
      console.log(error);
    }
  };

module.exports =  connectToDb;