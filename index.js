require('express-async-errors');
const handleErrors = require('./middleware/error');
const debug = require('debug')('app: index.js');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const config = require('config');
const app = express();

// Handle Errors
process.on('uncaughtException',(ex) => {
    console.log(ex);
    process.exit(1);
});
process.on('unhandledRejection',(ex) => {
    console.log(ex);
    process.exit(1);
});


debug(`App name: ${config.get('app.name')}`);
if(app.get('env') === 'production') {
    if( !config.get('app.jwtPrivateKey') ) {
        throw new Error('jwtPrivateKey is not defined.');
    }
}

app.use(cors())
app.use(helmet());
app.use(express.json());
require('./startup/db')();
require('./startup/routes')(app);
app.use(handleErrors);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}...`)); 

module.exports = server;