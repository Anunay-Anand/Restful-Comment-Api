//Require express framework 
const express = require('express');

//Requiring path module which is part of node.js
const path = require('path');

//Now fetch/excute express methods in app as covention
const app = express();

//Setting our view engine
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Creating our comment resource
const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        username: 'Skyler',
        comment: 'we will fly in the sky'
    },
    {
        username: 'Anunay',
        comment: 'Thak gya hu Bro!'
    },
    {
        username: 'coolDude69',
        comment: 'Mai sirf tumse baat karta hu!'
    },
]

//Routing for get and post
//Parsing the incoming data as form as well as json data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/tacos', (req, res) => {
    res.send("get /tacos response");
});

app.post('/tacos', (req, res) => {
    app.use(express.urlencoded({extended: true}));
    //Destructuring thr form body to get object values
    const {meat, qty: quantity = qty} = req.body;
    res.send(`We received the meat ${meat} you want. ${quantity} is available.`);
});


//Start the server 
app.listen(3000, () => {
    console.log("Server Started: On Port 3000");
});