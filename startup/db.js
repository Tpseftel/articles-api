const config = require('config');
const debug = require('debug')('app: startup/db');
const mongoose = require('mongoose');

mongoose.set('debug', false);
mongoose.set('useFindAndModify', false);


const topology = process.env.NODE_ENV == 'test' ? false : true;

let host = config.get('app.db_config.host');
let db_port = config.get('app.db_config.port');
let db_name = config.get('app.db_config.db_name');
let db_options = config.get('app.db_config.options');
let username = config.get('app.db_config.username');
let password = config.get('app.db_config.password');

module.exports = function () {
    let conn_string = "";

    if(process.env.NODE_ENV === 'production') {
        conn_string = `${host}://${username}:${password}@playerplant-nj5lw.mongodb.net/${db_name}?${db_options}`;
    } else {
        conn_string = "mongodb://" + host + ':' + db_port + '/' + db_name;
    }
    
    debug(`Connection String: ${conn_string}`);
    mongoose.connect(conn_string, {useNewUrlParser: true,  useUnifiedTopology: topology })
        .then(res => {
            console.log('Connecting to Mongo...\n');
        }).catch(error => {
            console.log('Error: ' + error.name + ' ' + error.message);
        });

};
