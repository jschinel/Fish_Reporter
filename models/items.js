   
// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require('./reviews.js')

// Create a schema to define the properties of the items collection
const itemSchema = new mongoose.Schema({
    Item_Number:{type:String, required:false},
    Name: { type: String, required: true },
    Description: { type: String, required: true }, 
    Rating: {type: Number, min: 0, max:10, required:true},
    Price: { type: Number, min: 0, required: true },
    Quantity: { type: Number, min: 0, required: true },
    Picture:{type:String},
    Reviews:[reviewSchema]
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('product', itemSchema);

