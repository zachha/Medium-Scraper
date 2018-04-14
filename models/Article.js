const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Note = require('Note.js');

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    link: {
        type: String,
        unique: true,
        required: true
    },
    summary: {
        type: String,
        required: false
    },
    // this will store the Note id and this allows us to link an article with a note
    note: [Note] 
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;