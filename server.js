const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routes = require('./routes/index');

const app = express();

// use body-parser;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add the routes
app.use('/api', routes);

// connect to the database
mongoose.connect('mongodb://heron:123456a@ds239873.mlab.com:39873/crud_app')
  .then(() => console.log('mongodb connected'))
;

// start the server
const port = 5000;
app.listen(port, () => `Server running on port ${port}`);