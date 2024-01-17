/* 
-----------------------------------------------------------------------------------
NOTE: Remember that all routes in this file are prefixed with `localhost:3000/Review`
-----------------------------------------------------------------------------------
*/
/* Require modules
// --------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


// /* Require the db connection, and models
// --------------------------------------------------------------- */

const db = require('../models')

// /* Routes
// --------------------------------------------------------------- */

router.get('/show/:id/:postid', function (req, res) {
    db.Location.find({_id: req.params.id})
    .then
    (  singleItem => 
        {
            for(let i = 0 ; i < singleItem[0].Posts.length ; i ++ )
            {
                if(singleItem[0].Posts[i].id==req.params.postid)
                {
                    const postData = singleItem[0].Posts[i];
                    res.render('posts_details',{singleItem: postData})
                }
            }
        }
    )
    .catch(() => res.send('404 Error: Page Not Found'))
})


router.get('/:id', function (req, res) {
    db.Location.find({_id: req.params.id})
        .then
        (
            singleItem =>res.render('posts_add',{reviewItem: singleItem})
        )
        .catch(() => res.send('404 Error: Page Not Found'))
})

router.get('/edit/:id', function (req, res) {
    db.Location.find({_id: req.params.id})
        .then
        (
            singleItem =>res.render('posts_edit',{reviewItem: singleItem})
        )
        .catch(() => res.send('404 Error: Page Not Found'))
})


router.post('/:id', (req, res) => {
    db.Location.findByIdAndUpdate(
        req.params.id,
        { $push: { Posts: req.body } },
        { new: true }
    )
    .then
    (
        res.redirect(`/Location/${req.params.id}`)
    )

});



/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router