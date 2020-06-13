const debug = require('debug')('app: startup/db');
const mongoose = require('mongoose');
mongoose.set('debug', true);


let topology = process.env.NODE_ENV == 'test' ? false : true;

module.exports = function () {
        mongoose.connect('mongodb://localhost:27017/blogDB',
            {
                useNewUrlParser: true,
                useUnifiedTopology: topology 
            }
        ).then(res => {
            debug('Connected to Mongo...\n');
        }).catch(error => {
            debug('Error: ' + error.name + ' ' + error.message);
        });
};
