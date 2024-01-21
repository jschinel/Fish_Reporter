<details>
<summary> Welcome to Poseidens Index </summary>

![Home Page](/Pictures/Website/Home.png)

The intentions of the website is to give the user quick and easy access to a multitude of fishing information for any lake. The user will also have access to adding locations or posting fish he caught in at a given location! With this we can all help each other to never get skunked again!

</details>

<details>
<summary> Technologies Used </summary>
Express , Mongoose , livereload , connect-livereload, ejs
</details>

<details>
<summary> Installation Instructions </summary>
There is a couple of things to know before making changes to this project.

First we will initialize and installed the according packages necessary. Inside your project terminal run the following commands to complete this.

npm init -y
npm i express ejs mongoose dotenv livereload connect-livereload

After this is completed a mongoDB will be necessary to store data. This is done by created a .env file.
Once created you will need to create a variable inside this file for your mongoDB connection. See the example listed below

>MONGODBURI="mongodb+srv://YourUsername:YourPassword@cluster0.ruhgrt4.mongodb.net/YourCollection"

NOTICE!!!!! You will have to replace "YourUsername:YourPassword" and "YourCollection" with your personal mongoDB information

For further information please reference the index.js file located in the models folder. (Refer to lines 7-8)
<details>

{\
// Require the Mongoose package & your environment configuration\
const mongoose = require('mongoose');\
require('dotenv').config()\
\
// Connect to MongoDB Atlas\
>mongoose.connect(process.env.MONGODBURI);\
>const db = mongoose.connection\
\
db.on('connected', function () {\
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);\
});\
\
// Export models & seed data\
module.exports = {\
    Location: require('./Locations'),\
    Posts: require('./posts'),\
    seedLocations: require('./seed')\
}\
}
</details>
</details>
<details>
<summary> Routes </summary>

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

<details>
<summary> Location Route Table Details </summary>

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| / | N/A | Get | read | Redirects to the spash page displaying all items

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/', async function (req, res) {\
    res.redirect('/Location')\
});\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /seed | N/A | Get | Create/Destroy | Will delete all items in database and re-initialize with local data

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app.get('/seed', async (req, res) => {\
    // Remove any existing items\
    const formerLocations = await db.Location.deleteMany({})\
    console.log(`Removed ${formerLocations.deletedCount} items`)\
    // Seed the items collection with the starter data\
    const newLocations = await db.Location.insertMany(db.seedLocations)\
    console.log(`Added ${db.seedLocations.length} items to be sold`)\
    //Redirect back to item gallery\
    res.redirect('/Location')\
})\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Location | Index | Get | Read | Displays all the items (Uses querry filters to sift through database)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/', async function (req, res)\
 {\
        // console.log(req.query)\
        let filterObj = req.query\
        for(let key in filterObj)\
        {\
            test=(filterObj[key])\
            if(test == '' || test == undefined)\
            {\
                delete filterObj[key]\
            }\
            if(key == 'Fish' && filterObj[key] != '' && filterObj[key] != undefined)\
            {\
                filterObj[key]=[filterObj[key]]\
            }\
        }\
        // console.log(filterObj) \
        const itemlist = await db.Location.find(filterObj)\
        res.render('home',{itemlist: itemlist})\
    })\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Location/:id | Show | Get | Read | Displays the details of the selected item

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/:id', async function (req, res) {/
    let singleItem = await db.Location.find({_id: req.params.id})/
    res.render('details',{singleItem: singleItem})/
})/


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Locaiton/add | New | Get | Read | Displays the form to create a new location

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/add', async function (req, res)/
 {/
        // console.log(req.query)/
        res.render('Form')/
})/


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Location/:id | Create | Post | Create | Creates the new location in the database

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/add', (req, res) => {\
    console.log(req.body)\
    db.Location.create(req.body)\
        .then(() => res.redirect('/'))\
})\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Location/edit/:id | Edit | Get | Read | Displays the form to edit a location

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/edit/:id', function (req, res) {\
    db.Location.find({_id: req.params.id})\
    .then\
    (\
        singleItem =>res.render('Edit',{singleItem: singleItem})\
    )\
})\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Location/edit/:id | Edit | Get | Read | Displays the form to edit a location

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/Update/:id', async function (req, res) {\
    await db.Location.updateOne({_id: req.params.id},{ $inc: {Fish_Caught: +1}})\
    res.redirect(`/Location/${req.params.id}`)\
})\


</details>

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

<details>
<summary> Posts Route Table Details </summary>

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Posts/:id | Show | Get | Read | Displays the details of the selected Post

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/show/:id/:postid', function (req, res) {\
    db.Location.find({_id: req.params.id})\
    .then\
    (  singleItem => \
        {\
            for(let i = 0 ; i < singleItem[0].Posts.length ; i ++ )\
            {\
                if(singleItem[0].Posts[i].id==req.params.postid)\
                {\
                    const postData = singleItem[0].Posts[i];\
                    res.render('posts_details',{singlePost: postData,singleItem: singleItem[0]})\
                }\
            }\
        }\
    )\
    .catch(() => res.send('404 Error: Page Not Found'))\
})\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Posts/add | New | Get | Read | Displays the form to create a new post

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/:id', function (req, res) {\
    db.Location.find({_id: req.params.id})\
        .then\
        (\
            singleItem =>res.render('posts_add',{reviewItem: singleItem})\
        )\
        .catch(() => res.send('404 Error: Page Not Found'))\
})\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Posts/:id | Create | Post | Create | Creates the new posts linked to a location

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/:id', (req, res) => {\
    db.Location.findByIdAndUpdate(\
        req.params.id,\
        { $push: { Posts: req.body } },\
        { new: true }\
    )\
    .then\
    (\
        res.redirect(`/Location/${req.params.id}`)\
    )\
});\

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Posts/edit/:id | Edit | Get | Read | Displays the form to edit a post

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/edit/:id/:postid', function (req, res) {\
    db.Location.find({_id: req.params.id})\
        .then\
        (\
            singleItem =>\
            {\
                for(let i = 0 ; i < singleItem[0].Posts.length ; i ++ )\
                {\
                    if(singleItem[0].Posts[i].id==req.params.postid)\
                    {\
                        const postData = singleItem[0].Posts[i];\
                        res.render('post_details_Edit',{singlePost: postData,singleItem: singleItem[0]})\
                    }\
                }\
            }\
        )\
        .catch(() => res.send('404 Error: Page Not Found'))\
})\


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Posts/UpdateEdit/:id | Update | Get | Use | Updates the selected database location

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.post('/update/:id/:postid', function (req, res) {\
    db.Location.find({_id: req.params.id})\
        .then\
        (\
            singleItem =>\
            {\
                for(let i = 0 ; i < singleItem[0].Posts.length ; i ++ )\
                {\
                    if(singleItem[0].Posts[i].id==req.params.postid)\
                    {\
                        singleItem[0].Posts[i] = req.body\
                        db.Location.findOneAndReplace({_id: req.params.id},singleItem[0])\
                        .then\
                        (\
                                res.redirect(`/Location/${req.params.id}`)\
                        )\
                    }\
                }\
            }\
        )\
        .catch(() => res.send('404 Error: Page Not Found'))\
})\



-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
URI | Rest Route | HTTP Method | Crud Action | Description
---|---|---|---|---|
| /Posts/delete/:id | Delete | Get | Destroy | Deletes the post from a location

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

router.get('/delete/:id/:postid', function (req, res) {\
    db.Location.find({_id: req.params.id})\
    .then\
    (\
        singleItem =>\
        {\
            // console.log(singleItem[0])\
            for(let i = 0 ; i < singleItem[0].Posts.length ; i ++ )\
            {\
                if(singleItem[0].Posts[i].id==req.params.postid)\
                {\
                    singleItem[0].Posts.splice(i,1);\
                    db.Location.findOneAndReplace({_id: req.params.id},singleItem[0])\
                    .then\
                    (\
                            res.redirect(`/Location/${req.params.id}`)\
                    )\
                }\
            }\
        }\
    )\
    .catch(() => res.send('404 Error: Page not Found'))\
})\

</details>
</details>



//////////////////////////////////

#Framework 1 Item Gallery (Index)('home')('/Catalog')

![Index_page](./Index.page.png)


#Framework 2 Item Details (Show)('details')('/Catalog/item/ (Item id number) ')

![Details_page](./Details.page.png)

#Framework 3 Item Form for Updating or Adding (Creat / Update) (/Catalog/add') (Catalog/edit')

![Details_page](./Form_Page.page.png)