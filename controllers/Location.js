/* 
-----------------------------------------------------------------------------------
NOTE: Remember that all routes in this file are prefixed with `localhost:3000/Location`
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


//////////////////////////// INDEX ROUTE ////////////////////////////////

router.get('/', async function (req, res)
 {
        // console.log(req.query)

        let itemlist = await db.Location.find(req.query)
        res.render('home',{itemlist: itemlist})
})

//////////////////////////// NEW ROUTE  ////////////////////////////////

router.get('/add', async function (req, res)
 {
        // console.log(req.query)
        res.render('Form')
})


////////////////////////////  CREATE ROUTE  ////////////////////////////////

router.post('/add', (req, res) => {
    console.log(req.body)
    db.Location.create(req.body)
        .then(() => res.redirect('/'))
})


////////////////////////////  SHOW ROUTE  ////////////////////////////////

router.get('/:id', async function (req, res) {
        let singleItem = await db.Location.find({_id: req.params.id})
        res.render('details',{singleItem: singleItem})
})

////////////////////////////  UPDATE ROUTE  ////////////////////////////////

router.get('/Update/:id', async function (req, res) {
    await db.Location.updateOne({_id: req.params.id},{ $inc: {Fish_Caught: +1}})
    res.redirect(`/Location/${req.params.id}`)
})

////////////////////////////  DESTROY ROUTE  ////////////////////////////////

router.get('/delete/:id', function (req, res) {
    {
        db.Location.findOneAndDelete({_id: req.params.id})
        .then(() => res.redirect('/'))
        .catch(() => res.send('404 Error: Page Not Found'))
    }
})

////////////////////////////  EDIT ROUTE  ////////////////////////////////

router.get('/edit/:id', function (req, res) {
    db.Location.find({_id: req.params.id})
    .then
    (       
        singleItem =>res.render('Edit',{singleItem: singleItem})
    )
})

////////////////////////////  UPDATE ROUTE  ////////////////////////////////

router.post('/UpdateEdit/:id', (req, res) => {
    const itemUpdate = req.body;
    db.Location.findOneAndReplace({_id: `${req.params.id}`},itemUpdate)
        .then(async() => {        
            let singleItem = await db.Location.find({_id: req.params.id})
            res.render('details',{singleItem: singleItem})
        })
})
// router.post('/postnew', (req, res) => {
//     console.log(req.body)
//     db.Product.create(req.body)
//         .then(() => res.redirect('/'))
// })
// router.get('/add', function (req, res) {
//         res.render('Form')
// })
// // Show Route (GET/Read): Will display an individual item document
// // using the URL parameter (which is the product id)
// router.get('/item/:id', function (req, res) {
//         db.Product.find({_id: req.params.id})
//             .then
//             (
//                 singleItem =>res.render('details',{singleItem: singleItem})
//             )
//             .catch(() => res.send('404 Error: Page Not Found'))
// })





/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router