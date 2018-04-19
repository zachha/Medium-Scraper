const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
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
    isSaved: {
        type: Boolean,
        default: false,
        required: true
    },
    // this will store the Note id and this allows us to link an article with a note
    note: {
    type: [{ 
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
    }
});

const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;