const  mongooose = require('mongoose');

const author_shema = new mongooose.Schema({
    first_name: String,
    last_name: String,
    // TODO: password email and so on
    articles: [{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
});

const Author = mongooose.model('Author', author_shema);
module.exports.Author = Author;