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
router.get('/:id', function (req, res) {
    db.Product.find({_id: req.params.id})
        .then
        (
            singleItem =>res.render('review',{reviewItem: singleItem})
        )
        .catch(() => res.send('404 Error: Page Not Found'))
})


router.post('/postnew/:id', (req, res) => {
    db.Product.findByIdAndUpdate(
        req.params.id,
        { $push: { Reviews: req.body } },
        { new: true }
    )
    .then
    (
        res.redirect(`/Catalog/item/${req.params.id}`)
    )

});



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router