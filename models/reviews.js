   
// Require the Mongoose package
const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    Reviewer:{type:String, required:false},
    Title: { type: String, required: true },
    Content: { type: String, required: true },
})

module.exports = reviewSchema