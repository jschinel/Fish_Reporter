
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
									ROUTE TABLE (Location)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| / | N/A | Get | read | Redirects to the spash page displaying all items
| /seed | N/A | Get | Create/Destroy | Will delete all items in database and re-initialize with local data
| /Location | Index | Get | Read | Displays all the items (Uses querry filters to sift through database)
| /Location/:id | Show | Get | Read | Displays the details of the selected item
| /Locaiton/add | New | Get | Read | Displays the form to create a new location
| /Location/:id | Create | Post | Create | Creates the new location in the database
| /Location/edit/:id | Edit | Get | Read | Displays the form to edit a location
| /Location/UpdateEdit/:id | Update | Get | Use | Updates the selected database location
| /Location/delete/:id | Delete | Get | Destroy | Deletes the location from the database


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
									ROUTE TABLE (Posts)
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Posts/:id | Show | Get | Read | Displays the details of the selected Post
| /Posts/add | New | Get | Read | Displays the form to create a new post
| /Posts/:id | Create | Post | Create | Creates the new posts linked to a location
| /Posts/edit/:id | Edit | Get | Read | Displays the form to edit a post
| /Posts/UpdateEdit/:id | Update | Get | Use | Updates the selected database location
| /Posts/delete/:id | Delete | Get | Destroy | Deletes the post from a location


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| / | N/A | Get | read | Redirects to the spash page displaying all items

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/', async function (req, res) {\
    res.redirect('/Catalog')\
});\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /seed | N/A | Get | Create/Destroy | Will delete all items in database and re-initialize with local data

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/seed', async (req, res) => {\
    // Remove any existing items\
    const formerItems = await db.Product.deleteMany({})\
    console.log(`Removed ${formerItems.deletedCount} items`)\
    // Seed the items collection with the starter data\
    const newProducts = await db.Product.insertMany(db.seedProduct)\
    console.log(`Added ${db.seedProduct.length} items to be sold`)\
    //Redirect back to item gallery\
    res.redirect('/Catalog')\
})\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Catalog | Index | Get | Read | Displays all the items

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/', async function (req, res) {\
    const itemlist = await db.Product.find({})\
    res.render('home',{itemlist: itemlist})\
})\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Catalog/item/:id | Show | Get | Read | Displays the details of a specific item

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/item/:id', function (req, res) {\
        db.Product.find({_id: req.params.id})\
            .then\
            (\
                singleItem =>res.render('details',{singleItem: singleItem})\
            )\
            .catch(() => res.send('404 Error: Page Not Found'))\
})\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Catalog/delete/:id | destroy | get | delete | Deletes a specific item dependant on the ID

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/delete/:id', function (req, res) {\
    {\
        db.Product.findOneAndDelete({_id: req.params.id})\
            .then(() => {\
                db.Product.find({})\
                .then(newItems => \
                res.render('home',{itemlist: newItems})\
                )\
            })\
            .catch(() => res.send('404 Error: Page Not Found'))\
    }\
})\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Catalog/add  | new | Get | Read | This will display the form in order to add a product to the database

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------


router.get('/add', function (req, res) {\
        res.render('Form')\
})\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Catalog/edit/:id | edit  | GET | Read | This will bring up the edit form to change a product on the DB

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/edit/:id', function (req, res) {\
    db.Product.find({_id: req.params.id})\
    .then\
    (\
        singleItem =>res.render('Edit',{singleItem: singleItem})\
    )\
})\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Catalog/update/:id | update | Patch | Use |  This actually go and change teh item in the database

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/update/:id', function (req, res) {\
    {\
        db.Product.find({_id: req.params.id})\
        .then(singleItem => {\
            if(singleItem[0].Quantity>0)\
            {\
                let newValue = singleItem[0].Quantity -1;\
                db.Product.findOneAndUpdate({_id: req.params.id},{Quantity: newValue})\
                .then\
                (\
                    db.Product.find({_id: req.params.id})\
                    .then\
                    (\
                        singleItem =>res.render('details',{singleItem: singleItem})\
                    )\
                )\
            }\
            if(singleItem[0].Quantity<=0)\
            {\
                let newValue = singleItem[0].Quantity;\
            db.Product.findOneAndUpdate({_id: req.params.id},{Quantity: newValue})\
            .then\
            (\
                db.Product.find({_id: req.params.id})\
                .then\
                (\
                    singleItem =>res.render('details',{singleItem: singleItem})\
                )\
            )}\
        })\
        .catch(() => res.send('404 Error: Page Not Found'))\
    }\
})\












-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Review/:id | new	| GET | Read | Display the form to create a new post

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/:id', function (req, res) {\
    db.Product.find({_id: req.params.id})\
        .then\
        (\
            singleItem =>res.render('review',{reviewItem: singleItem})\
        )\
        .catch(() => res.send('404 Error: Page Not Found'))\
})\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Review/postnew/:id | create | post | Read | Will actually create the new post to a product

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/postnew/:id', (req, res) => {\
    db.Product.findByIdAndUpdate(\
        req.params.id,\
        { $push: { Reviews: req.body } },\
        { new: true }\
    )\
    .then\
    (\
        res.redirect(`/Catalog/item/${req.params.id}`)\
    )\
\
});\



#Framework 1 Item Gallery (Index)('home')('/Catalog')

![Index_page](./Index.page.png)


#Framework 2 Item Details (Show)('details')('/Catalog/item/ (Item id number) ')

![Details_page](./Details.page.png)

#Framework 3 Item Form for Updating or Adding (Creat / Update) (/Catalog/add') (Catalog/edit')

![Details_page](./Form_Page.page.png)