   
// Require the Mongoose package
const mongoose = require('mongoose');
const reviewSchema = require('./reviews.js')

// Create a schema to define the properties of the items collection
const itemSchema = new mongoose.Schema({
    Location_Type:{type:String, required: true},
    Name: { type: String, required: true },
    City: {type: String, required:false},
    Fish: { type: String, required: false },
    Picture:{type: String}, 
    Posts:[reviewSchema]
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('product', itemSchema);

