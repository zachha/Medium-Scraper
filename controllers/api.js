const cheerio = require('cheerio');
const request = require('request');
const express = require('express');
const router = express.Router();
const adb = require("../articleController");


router.get("/", (req, res) => {
    let hbsObj = { 
        mainTitle: "Medium Article Scraper",
        subtitle: "Choose your favorite category from the dropdown, then hit Scrape!"
    };
    res.render("index", hbsObj);
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
        // ADD ARTICLE
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
  // SHOW NOTES OF ARTICLE
  let thisId = req.params.id;
});


// add route for adding article note
router.post("/articles/:id", (req, res) => {
    let thisId = req.params.id;
    let noteText = req.body;
  // ADD NOTE 
})


router.get("/saved", (req, res) => {
    let hbsObj = { 
        mainTitle: "Saved Articles",
        subtitle: "Click the articles to view comments!"
    };
    res.render('saved', hbsObj);
})

module.exports = router;


