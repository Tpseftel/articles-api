const  mongooose = require('mongoose');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
require('./category'); 
require('./author'); 


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
    published_date: {
        type: Date
    },
    category: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    author: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Author'
    }


    
});


const Article = mongooose.model('Article', article_shema);

function validateArticle(article) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(250).required(),
        summary: Joi.string().min(3),
        published_status: Joi.boolean(),
        published_date: Joi.date(),
        author: Joi.objectId(),
        category: Joi.objectId(),
    }); 
    return schema.validate(article);
}

module.exports.Article = Article;
module.exports.validateArticle = validateArticle;
