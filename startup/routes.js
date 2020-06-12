const articles = require('../routes/articles' );

module.exports = function (app) {
    app.use('/api/articles', articles);
};