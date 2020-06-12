const  mongooose = require('mongoose');


const article_shema = new mongooose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 250,
        trim: true
    },
    summary: {
        type: String,
        minlength: 5
    },
    published_status: {
        type: Boolean
    },
    published_date:{
        type: Date
    }
    // TODO: Author
    // TODO: category see vidly 
});


const Article = mongooose.model('Article', article_shema);

// TODO: User input validation Joi

module.exports.Article = Article;
