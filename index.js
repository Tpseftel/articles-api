const helmet = require('helmet');
const express = require('express');
const app = express();


app.use(helmet());
app.use(express.json());

require('./startup/db')();
require('./startup/routes')(app);


const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}...`)); 
module.exports = server;