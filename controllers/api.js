const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
// links the model controller
const adb = require("./articleController");

// GET route for main page, populate sthe titles appropriately
router.get("/", (req, res) => {
    let hbsObj = { 
        mainTitle: "Medium Article Scraper",
        subtitle: "Choose your favorite category from the dropdown, then hit Scrape!"
    };
    res.render("index", hbsObj);
})

// GET to scrape The Washington Post
router.get("/scrape", (req, res) => {
  //html body is requested
  request("http://www.medium.com/topic/javascript/", (error, response, html) => {
    //html loads into cheerio
    const $ = cheerio.load(html);
    let result = {};
    // grabs the title and link for each article 
    $("div.js-trackedPost").each(function(i, element) {
      result.category = "Javascript";
      result.title = $(this)
        .find("a.u-block")
        .attr("aria-label");
      result.link = $(this)
        .find("a.u-block")
        .attr("href");
      result.summary = $(this)
        .find("h4.ui-summary")
        .text();
      //new Article created in the db using reply obj
      if((result.link) && (result.title)) {
        adb.addArticle(result);
      }
    });
  });
});

// will search the articles db and populate articles and notes from database
router.get("/articles", (req, res) => {
    adb.findAll();
});

//route for grabbing one article and showing it's notes
router.get("/articles/:id", (req, res) => {
  let thisId = req.params.id;
  adb.showNotes(thisId);
});

//route to update an article to be Saved
router.put("/articles/:id", (req, res) => {
    let thisId = req.params.id;
    adb.saveArticle(thisId);
})

//route to update an article to unsave it
router.put("/articles/:id", (req, res) => {
    let thisId = req.params.id;
    adb.unsaveArticle(thisId);
})

// route for adding article note
router.post("/articles/:id", (req, res) => {
    let thisId = req.params.id;
    let noteText = req.body;
    adb.createNote(thisId, noteText);
})

// finds all saved articles
router.get("/saved", (req, res) => {
    let hbsObj = { 
        mainTitle: "Saved Articles",
        subtitle: "Click the articles to view comments!"
    };
    res.render('index', hbsObj);
    adb.findSaved();
})

module.exports = router;


