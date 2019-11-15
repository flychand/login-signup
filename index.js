const express = require('express');
const bodyParser = require('body-parser');
const users = require('./models/routes'); // Imports routes for the products
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/assignment', {useNewUrlParser: true});
const app = express();
app.use(bodyParser.json());


app.use('/user', users);
let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});