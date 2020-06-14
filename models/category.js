const  mongooose = require('mongoose');

const category_shema = new mongooose.Schema({
    name: String,
    articles:[{
        type: mongooose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
});

const Category = mongooose.model('Category', category_shema);
module.exports.Category = Category;