const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cheerio = require('cheerio');
const handlebars = require('express-handlebars');
const PORT = process.env.PORT || 8000;

const db = require("./models");

const app = express();

// used to handle form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// used to serve public folder as static directory
app.use(express.static('public'));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});