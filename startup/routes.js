const articles = require('../routes/articles' );
const authors = require('../routes/authors' );
const authentication = require('../routes/authentication' );

module.exports = function (app) {
    app.use('/api/articles', articles);
    app.use('/authors', authors);
    app.use('/login',authentication);
};