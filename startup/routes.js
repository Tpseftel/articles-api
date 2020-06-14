const articles = require('../routes/articles' );
const authors = require('../routes/authors' );
const categories = require('../routes/categories' );
const authentication = require('../routes/authentication' );

module.exports = function (app) {
    app.use('/api/articles', articles);
    app.use('/api/categories', categories);
    app.use('/api/authors', authors);
    app.use('/login', authentication);
};