const db = require('../models');

module.exports = {

  // Finds all NON saved articles to populate the Home page with, also populates Main Title and Subtitle appropriately
  findAllFalse: (res, route) => {
    db.Article.find({ isSaved: false })
      .then(dbArticle => {
        if (route) {
          let hbsObj = {
            mainTitle: "Medium Article Scraper",
            subtitle:
              "Choose your favorite category from the dropdown, then hit Scrape!",
            articles: dbArticle
          };
          res.render("index", hbsObj);
        } else {
          console.log("test");
          res.json(dbArticle);
        }
      })
      .catch(err => {
        res.json(err);
      });
  },

  //finds one article by id and returns it to ID route endpount
  findOne: (thisId, res) => {
    db.Article.findOne({
      _id: thisId
    })
      .then(dbArticle => {
        res.send(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // Finds all articles and returns to API route endpoint
  findAll: (res) => {
    db.Article.find({})
      .then(dbArticle => {
        res.send(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // Finds all SAVED Articles and populates Saved Page Title and Subtitle appropriately
  findSaved: res => {
    db.Article.find({
      isSaved: true
    })
      .then(dbArticle => {
        let hbsObj = {
          mainTitle: "Saved Articles",
          subtitle: "Click the articles to view comments!",
          savedArticles: dbArticle
        };
        res.render("index", hbsObj);
        //res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      });
  },

  // Adds new articles when scrape is used
  addArticle: (result, res) => {
    db.Article.create(result)
      .then(dbArticle => {
        // logs the article added
        console.log(dbArticle);
        res.json(dbArticle);
      })
      .catch(err => res.json(err));
  },

  // updates an article to become 'saved' by the user 
  saveArticle: (thisId, res) => {
    db.Article.update({ _id: thisId }, { $set: { isSaved: true } }, () => {
      console.log("Article saved!");
      res.end();
    });
  },
 // updates an article to remove 'saved' 
  unsaveArticle: (thisId, res) => {
    db.Article.update({ _id: thisId }, { $set: { isSaved: false } }, () => {
      console.log("Article no longer saved!");
      res.end();
    });
  },

 // shows all notes from a specified article using it's ID
  showNotes: (thisId, res) => {
    db.Article.findOne({ _id: thisId })
      .populate({
          path: "note",
          model: "Note"
        })
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => res.json(err));
  },

  // Creates a new note and associates it to the appropriate article
  createNote: (thisId, noteText, res) => {
    db.Note.create(noteText)
      .then(dbNote => {
        // associates note with article
        db.Article.findOneAndUpdate(
          { _id: thisId },
          {$push:  {note: dbNote._id }},
          { new: true }
        )
        .then(results => console.log("association was a success!"))
        .catch(err => console.log(err));

        console.log(`comment added to article: ${thisId}!`);
        console.log(`comment: ${noteText}`);
        res.json(dbNote);
        //})
        //.then(dbArticle => {
        // res.json(dbArticle);
      })
      .catch(err => {
        console.log("error creating note");
        console.log(err);
        res.json(err);
      });
  },

 // deletes a note and removes it from the article
  deleteNote: (thisId, res) => {
     db.Note.findByIdAndRemove({
          _id: thisId 
        })
       .then((dbNote) => {
         return db.Article.findOneAndUpdate(
            {note: thisId },
            { $pullAll: [{ note: thisId }] }
        );
       })
       .then(dbArticle => res.json(dbArticle))
       .catch(err => res.json(err));
  }
};