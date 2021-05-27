//Require express framework 
const express = require('express');

//Requiring path module which is part of node.js
const path = require('path');

//Now fetch/excute express methods in app as covention
const app = express();

//Fetch UUID package installed by NPM for index
const {v4: uuid} = require('uuid');

//Serving our static files
app.use(express.static(path.join(__dirname, 'public')));

//Setting our view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Creating our comment resource
const comments = [{
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'we will fly in the sky'
    },
    {
        id: uuid(),
        username: 'Anunay',
        comment: 'Thak gya hu Bro!'
    },
    {
        id: uuid(),
        username: 'coolDude69',
        comment: 'Mai sirf tumse baat karta hu!'
    },
]

//Routing for get and post
//Parsing the incoming data as form as well as json data
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//Index or home route
app.get('/comments', (req, res) => {
    res.render('comments/index.ejs', {
        comments: comments
    });
});

//Part of Create Route
app.get('/comments/new', (req, res) => {
    res.render('comments/new.ejs');
});

//Create Route
app.post('/comments', (req, res) => {
    const {
        username,
        comment
    } = req.body;
    //Update your comment database before rendering
    comments.push({
        username: username,
        comment: comment,
        id: uuid()
    });
    //redirect user to the home or index url
    res.redirect('/comments');
});

//Show route
app.get('/comments/:id', (req, res) => {
    const {
        id
    } = req.params;
    //Find the comment in the database using ID
    const comment = comments.find( c => c.id === id);
    res.render('comments/show.ejs', {comment: comment});
});

// app.get('/tacos', (req, res) => {
//     res.send("get /tacos response");
// });

// app.post('/tacos', (req, res) => {
//     app.use(express.urlencoded({
//         extended: true
//     }));
//     //Destructuring thr form body to get object values
//     const {
//         meat,
//         qty: quantity = qty
//     } = req.body;
//     res.send(`We received the meat ${meat} you want. ${quantity} is available.`);
// });


//Start the server 
app.listen(3000, () => {
    console.log("Server Started: On Port 3000");
});