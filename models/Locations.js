   
// Require the Mongoose package
const mongoose = require('mongoose');
const postsSchema = require('./posts.js')

// Create a schema to define the properties of the items collection
const locationSchema = new mongoose.Schema({
    Location_Type:{type:String, required: true},
    Name: { type: String, required: true },
    City: {type: String, required:false},
    Fish: [String],
    Fish_Caught:{type:Number, required:false},
    Picture:{type: String}, 
    Posts:[postsSchema]
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Location', locationSchema);

