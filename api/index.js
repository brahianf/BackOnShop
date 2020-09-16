const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config.js');
const user = require('./components/user/network');

const app = express();

// app.use(bodyParser.json());

// Router
app.use('/api/user', user);

app.listen(config.api.port, () => {
  console.log('Api listen port', config.api.port);
});