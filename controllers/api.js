const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const router = express.Router();
const db = require('../models');



router.get("/", (req, res) => {
    res.render('index');
})
// GET to scrape The Washington Post
// BUG with the scrape function, not doing what it needs to.
router.get("/scrape", (req, res) => {
  //html body is requested
  request("http://www.medium.com/topic/javascript/", (error, response, html) => {
    //html loads into cheerio
    const $ = cheerio.load(html);
    let result = {};
    // grabs the title and link for each post on the subreddit
    $("div.js-trackedPost").each(function(i, element) {
      result.category = "Javascript";
      //reply.title = $(this).children().children('div').children();
      result.title = $(this)
        .find("a.u-block")
        .attr("aria-label");
      //reply.link = $(this).children().children("a").attr("href");
      result.link = $(this)
        .find("a.u-block")
        .attr("href");
      //reply.summary = $(this).children().children("div").children("div.flex1").children().children("a").children()
      result.summary = $(this)
        .find("h4.ui-summary")
        .text();
      //new Article created in the db using reply obj
      if((result.link) && (result.title)) {
        db.Article.create(result)
          .then(function(dbArticle) {
            // logs the article added
            console.log(dbArticle);
            res.json(dbArticle);
          })
          .catch(err => res.json(err));
      }
    });
  });
});

// will search the articles db and populate articles and notes from database
router.get("/articles", (req, res) => {
  db.Article.find({})
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

//route for grabbing one article and showing it's notes
router.get("/articles/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(err => res.json(err));
});

/*
// add route for adding article note
router.post("/articles/:id", (req, res) => {
  db.Note.
})
*/

module.exports = router;
