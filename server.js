/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");


/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const itemCtrl = require('./controllers/product');
const reviewCtrl = require('./controllers/reviews');
const { find } = require('./models/items');


/* Create the Express app
--------------------------------------------------------------- */
const app = express();
app.use(express.json());
// Middleware for parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));
/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());


/* Mount routes
--------------------------------------------------------------- */

// Home page
app.get('/', async function (req, res) {
    res.redirect('/Catalog')
});

// When a GET request is sent to `/seed`, the items collection is seeded
app.get('/seed', async (req, res) => {
    // Remove any existing items
    const formerItems = await db.Product.deleteMany({})
    console.log(`Removed ${formerItems.deletedCount} items`)
    // Seed the items collection with the starter data
    const newProducts = await db.Product.insertMany(db.seedProduct)
    console.log(`Added ${db.seedProduct.length} items to be sold`)
    //Redirect back to item gallery
    res.redirect('/Catalog')
})

// This tells our app to look at the `controllers/product.js` file 
// to handle all routes that begin with `localhost:3000/item`
app.use('/Catalog', itemCtrl)
app.use('/Review', reviewCtrl)


/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});