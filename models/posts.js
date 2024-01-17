   
// Require the Mongoose package
const mongoose = require('mongoose');


const postsSchema = new mongoose.Schema({
    Reviewer:{type:String, required:false},     //Reviewers accoutn name
    Title: { type: String, required: true },    // Title of the post
    Bait: {type: String, require:false},        //Worms, mealworms, leeches, minnow, artifical, lure, other
    Time: {type: String, require:false},        // Morning, Afternoon, Night
    Weather: {type: String, require:false},     //Sunny, Foggy, Snowing, Raining, Windy
    Content: { type: String, required: true },  // Description of how many fish caught what kind etc
})

module.exports = postsSchema