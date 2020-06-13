const  mongooose = require('mongoose');

const category_shema = new mongooose.Schema({
    name: String,
});

const Category = mongooose.model('Category', category_shema);
module.exports.Category = Category;