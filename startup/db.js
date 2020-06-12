const debug = require('debug')('app: startup/db');
const mongoose = require('mongoose');
mongoose.set('debug', true);


module.exports = function () {
        mongoose.connect('mongodb://localhost:27017/blogDB', {useNewUrlParser: true,  useUnifiedTopology: true })
        .then(res => {
            debug('Connecting to Mongo...\n');
        }).catch(error => {
            debug('Error: ' + error.name + ' ' + error.message);
        });
};
