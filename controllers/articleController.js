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

    
}