const db = require('../models');

module.exports = {
    findAll: () => {
        db.Article.find({})
        .then(dbArticle => {
            res.json(dbArticle);
        })
        .catch(err => {
            res.json(err);
        });
    },

    addArticle: (result) => {
        db.Article.create(result)
          .then((dbArticle) => {
            // logs the article added
            console.log(dbArticle);
            res.json(dbArticle);
          })
          .catch(err => res.json(err));
    },

    showNotes: (thisId) => {
        db.Article.findOne({ _id: thisId })
          .populate("note")
          .then((dbArticle) => {
            res.json(dbArticle);
          })
          .catch(err => res.json(err));
    },

    createNote: (thisId, noteText) => {
        db.Note.create(noteText)
        .then((dbNote) => {
        // associates note with article
          return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then((dbArticle) => {
            res.json(dbArticle);
        })
        .catch((err) => {
            res.json(err);
        });
    },

    deleteNote: (thisId) => {
        db.Note.deleteOne({
            _id: thisId
        })
        .then
    }
}