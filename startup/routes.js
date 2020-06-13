const articles = require('../routes/articles' );
const authors = require('../routes/authors' );

module.exports = function (app) {
    app.use('/api/articles', articles);
    app.use('/authors', authors);
};