const debug = require('debug')('app: index.js');
const helmet = require('helmet');
const express = require('express');
const config = require('config');
const app = express();


app.use(helmet());
app.use(express.json());

debug(`App name: ${config.get('app.name')}`);

if(app.get('env') === 'production') {
    if( !config.get('app.jwtPrivateKey') ) {
        throw new Error('jwtPrivateKey is not defined.');
    }
}


require('./startup/db')();
require('./startup/routes')(app);


const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`)); 
module.exports = server;