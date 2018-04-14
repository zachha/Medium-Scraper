const request = require('request');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const axios = require('axios');
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

// GET to scrape The Washington Post
app.get("/scrape", (req, res) => {
  //html body is requested
  axios.get("http://www.medium.com/topic/javascript/").then((reply) => {
    //html loads into cheerio 
    const $ = cheerio.load(reply.data);
    let result = {};
    // grabs the title and link for each post on the subreddit
    $("div.js-trackedPost").each(function(i, element) {
      reply.title = $(this).children().children('div').children();
      reply.link = $(this).children().children("a").attr("href");
      reply.summary = $(this).children().children()
    //new Article created in the db using reply obj
    db.Article.create(reply)
      .then(function(dbArticle) {
      // logs the article added
        console.log(dbArticle);
      }).catch( err => res.json(err));
    });

  });
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});