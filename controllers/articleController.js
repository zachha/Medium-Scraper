const db = require('../models');

module.exports = {
  findAll: (res, route) => {
    db.Article.find({})
      .then(dbArticle => {
          if(route) {
              let hbsObj = { mainTitle: "Medium Article Scraper", subtitle: "Choose your favorite category from the dropdown, then hit Scrape!", articles: dbArticle };
              res.render("index", hbsObj);
          } else {
              res.json(dbArticle);
          }
          
      })
      .catch(err => {
        res.json(err);
      });
  },

  findSaved: (res) => {
      db.Article.find({
        isSaved: true
      })
      .then(dbArticle => {
        let hbsObj = { mainTitle: "Saved Articles", subtitle: "Click the articles to view comments!", savedArticles: dbArticle };
        res.render("index", hbsObj);
        //res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  },

  addArticle: (result, res) => {
    db.Article.create(result)
      .then(dbArticle => {
        // logs the article added
        console.log(dbArticle);
        res.json(dbArticle);
      })
      .catch(err => res.json(err));
  },

  saveArticle: thisId => {
    db.Article.update({ _id: thisId }, { $set: { isSaved: true } }, () =>
      console.log("Article saved!")
    );
  },

  unsaveArticle: thisId => {
    db.Article.update({ _id: thisId }, { $set: { isSaved: false } }, () =>
      console.log("Article no longer saved!")
    );
  },

  showNotes: (thisId, res) => {
    db.Article.findOne({ _id: thisId })
      .populate("note")
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => res.json(err));
  },

  createNote: (thisId, noteText, res) => {
    db.Note.create(noteText)
      .then(dbNote => {
        // associates note with article
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { note: dbNote._id },
          { new: true }
        );
      })
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  },

  deleteNote: thisId => {
    db.Note.deleteOne({
      _id: thisId
    }).then(() => {
      console.log("comment deleted");
    });
  }
};