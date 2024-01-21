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
        let filterObj = req.query
        for(let key in filterObj)
        {

            test=(filterObj[key])
            if(test == '' || test == undefined)
            {
                delete filterObj[key]
            }
            if(key == 'Fish' && filterObj[key] != '' && filterObj[key] != undefined)
            {
                filterObj[key]=[filterObj[key]]
            }
        }
        // console.log(filterObj) 
        const itemlist = await db.Location.find(filterObj)
        res.render('home',{itemlist: itemlist})
    })

    
//////////////////////////// NEW ROUTE  ////////////////////////////////

router.get('/add', async function (req, res)
{
       // console.log(req.query)
       res.render('Form')
})

////////////////////////////  SHOW ROUTE  ////////////////////////////////

router.get('/:id', async function (req, res) {
    let singleItem = await db.Location.find({_id: req.params.id})
    res.render('details',{singleItem: singleItem})
})


////////////////////////////  CREATE ROUTE  ////////////////////////////////

router.post('/add', (req, res) => {
    console.log(req.body)
    db.Location.create(req.body)
        .then(() => res.redirect('/'))
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

router.get('/Update/:id', async function (req, res) {
    await db.Location.updateOne({_id: req.params.id},{ $inc: {Fish_Caught: +1}})
    res.redirect(`/Location/${req.params.id}`)
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

////////////////////////////  DESTROY ROUTE  ////////////////////////////////

router.get('/delete/:id', function (req, res) {
    {
        db.Location.findOneAndDelete({_id: req.params.id})
        .then(() => res.redirect('/'))
        .catch(() => res.send('404 Error: Page Not Found'))
    }
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router