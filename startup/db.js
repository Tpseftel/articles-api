const debug = require('debug')('app: startup/db');
const mongoose = require('mongoose');
mongoose.set('debug', true);


const topology = process.env.NODE_ENV == 'test' ? false : true;
const db_name = process.env.NODE_ENV == 'test' ? 'blogDB_test' :'blogDB';

module.exports = function () {
        mongoose.connect('mongodb://localhost:27017/' + db_name,
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
