const express = require("express");
const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cheerio = require('cheerio');

//set PORT
const PORT = process.env.PORT || 8000;

//models linked
const db = require("./models");
// express initialized
const app = express();

// used to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// handlebars added
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');

// used to serve public folder as static directory
app.use(express.static('public'));
//router added
const router = require('./controllers/routes/html-routes.js');
app.use(router);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

// listening for server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

