/* 
-----------------------------------------------------------------------------------
NOTE: Remember that all routes in this file are prefixed with `localhost:3000/Catalog`
-----------------------------------------------------------------------------------
*/
/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */

const db = require('../models')

/* Routes
--------------------------------------------------------------- */
router.get('/', async function (req, res) {
    const itemlist = await db.Product.find({})
    res.render('home',{itemlist: itemlist})
})

router.post('/postnew', (req, res) => {
    console.log(req.body)
    db.Product.create(req.body)
        .then(() => res.redirect('/'))
})

router.post('/UpdateEdit/:id', (req, res) => {
    const itemUpdate = req.body;
    db.Product.findOneAndReplace({_id: `${req.params.id}`},itemUpdate)
        .then(() => res.redirect('/'))
})
// Show Route (GET/Read): Will display an individual item document
// using the URL parameter (which is the product id)
router.get('/add', function (req, res) {
        res.render('Form')
})

router.get('/edit/:id', function (req, res) {
    db.Product.find({_id: req.params.id})
    .then
    (       
        singleItem =>res.render('Edit',{singleItem: singleItem})
    )
})
// Show Route (GET/Read): Will display an individual item document
// using the URL parameter (which is the product id)
router.get('/item/:id', function (req, res) {
        db.Product.find({_id: req.params.id})
            .then
            (
                singleItem =>res.render('details',{singleItem: singleItem})
            )
            .catch(() => res.send('404 Error: Page Not Found'))
})
router.get('/delete/:id', function (req, res) {
    {
        db.Product.findOneAndDelete({_id: req.params.id})
            .then(() => {
                db.Product.find({})
                .then(newItems => 
                res.render('home',{itemlist: newItems})
                )
            })
            .catch(() => res.send('404 Error: Page Not Found'))
    }
})
router.get('/update/:id', function (req, res) {
    {
        db.Product.find({_id: req.params.id})
        .then(singleItem => {
            if(singleItem[0].Quantity>0)
            {
                let newValue = singleItem[0].Quantity -1;   
                db.Product.findOneAndUpdate({_id: req.params.id},{Quantity: newValue})
                .then
                (
                    db.Product.find({_id: req.params.id})
                    .then
                    (
                        singleItem =>res.render('details',{singleItem: singleItem})
                    )
                )
            }
            if(singleItem[0].Quantity<=0)
            {
                let newValue = singleItem[0].Quantity;
            db.Product.findOneAndUpdate({_id: req.params.id},{Quantity: newValue})
            .then
            (
                db.Product.find({_id: req.params.id})
                .then
                (
                    singleItem =>res.render('details',{singleItem: singleItem})
                )
            )}
        })
        .catch(() => res.send('404 Error: Page Not Found'))
    }
})



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router