const  mongooose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);


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
        type: Boolean,
        default: false
    },
    published_date:{
        type: Date
    }
    // TODO: Author
    // TODO: category see vidly 
});


const Article = mongooose.model('Article', article_shema);

function validateArticle(article) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(250).required(),
        summary: Joi.string().min(3),
        published_status: Joi.boolean(),
        published_date: Joi.date(),
        author: Joi.array().items(Joi.objectId()),
        category: Joi.array().items(Joi.objectId()),
    }); 
    return schema.validate(article);
}

module.exports.Article = Article;
module.exports.validateArticle = validateArticle;
