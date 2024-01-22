
<h1>

![Home Page](public/Pictures/Website/Home.png)

The intentions of the website is to give the user quick and easy access to a multitude of fishing information for any lake. The user will also have access to adding locations or posting fish he caught at a given location! With this we can all help each other to never get skunked again!
 
Follow the link below to find your next fishing spot!

https://fishfinder-b9950a38c220.herokuapp.com/Location


<h1>User Stories</h1>

 <details>
 <summary> User </summary>
-As a user i want to be able to review different fishing areas to see which kind of fish and how well the fishing is doing in a certain lake or river.
 </details>
 <details>
 <summary> Full-Stack Developer </summary>
-As a full stack developer i want to see a MEN stack layout with all the Restful Routes and CRUD operations being used.
 </details>
  <details>
 <summary> Front-End Devekoper </summary>
-As a front end developer i want to see responsiveness and visual auesthetics on the webpage along with a natural flow of navigation.
 </details>
<br>
<h1>User Interface</h1>
<details>
<summary> Navigation </summary>
This will display each page of this website. Follow the number and color coding for a detailed description of each section.

 <details>
 <summary> Home </summary>

![Alt text](public/Pictures/Website/Home_Nav.png)
<p style="color:red">1A - The edit button will bring the user to the edit form for the current post selected<br>
 1B - The delete button will delete the current post from the location.</p>

<p style="color:Yellow">2A - Here you see the current post you have selected</p.>

</details>

<details>
<summary> Details </summary>

 ![Alt text](public/Pictures/Website/Details_Nav.png)
 <p style="color:red">1A - The edit button will bring you to the form page for editing the current location<br>
 1B - The delete button will delete the location from the database<br>
 1C - The post review button will bring the user to the form page to add a post </p>

<p style="color:Yellow">2A - Displays all the details about the current item selected.</p.>

<p style="color:Green">3A - Displays the all the current posts related to this location.<br>
NOTE - This section will be moved below Section 2A when the screen is smaller than 900px.

<p style="color:aqua">4A - This is the layout of a general post. The most recent post will always be at the top of the list. Any post can be clicked on to edit or delete<br>
</details>

<details>
<summary> Posts </summary>

![Alt text](public/Pictures/Website/Post_Nav.png)
 <p style="color:red">1A - The edit button will bring you to the form page for editing the current location<br>
 1B - The delete button will delete the location from the database<br>
 1C - The post review button will bring the user to the form page to add a post </p>

<p style="color:Yellow">2A - Displays all the details about the current item selected.</p.>

</details>

<details>
<summary> Form </summary>
<h1>Location Form </h1>
Please fill out all fields display on the location form. When done press the submit button and your new location will be added to the database

![Alt text](public/Pictures/Website/Location_Form.png)
<h1> Post Form </h1>
Please fill out all fields display on the post form. When done press the submit button and your new post will be added to the locations detail page.

![Alt text](public/Pictures/Website/Post_Form.png)
</details>

</details>
<br>
<h1>Technical Data</h1>
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
<br>
<h1>Extra</h1>
 <details>
 <summary> Struggles </summary>
 <p> While trying to set up the filtering of this website i ran into a couple problems with using the querry parameters as the filter. There is a little more research needed before i can make sure i use the right mongo db operators and correct layout of my req.query parameters for the arrays.<p>
 </details>
 <details>
 <summary> Future Design </summary>
 <p>In the future i will be panning on connecting this to an api. Hopefully one that would have the lake or river class,type,etc. along with possibly have profile structure that could connect to other profiles (friends) in whom you can share private posts<p>
 </details>
