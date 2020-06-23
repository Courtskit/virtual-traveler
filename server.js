'use strict';

///////////////////LIBRARIES/////////////////////////////////
const express = require('express');
const superagent = require('superagent');
require('dotenv').config();
const app = express();
const pg = require('pg');
const PORT = process.env.PORT || 3001;
const client = new pg.Client(process.env.DATABASE_URL);
require('ejs');
// allows ejs to work - look in views folder for your template
app.set('view engine', 'ejs');

// this allows us to see the request.body
app.use(express.urlencoded({
  extended: true
}));

// serve files from public folder
app.use(express.static('./public'));

////////////////////////MODULES//////////////////////////////
const food = require('./libs/food.js');
const location = require('./libs/location.js');
const help = require('./libs/helper');

///////////////////ROUTES//////////////////////
app.get('/', searchForm);
app.get('/searches', food.handler);
app.get('/locations', location.handler);



function searchForm(request, response) {
  response.render('pages/index.ejs');
}
///////////////////CONNECT//////////////////////
client.on('error', err => console.log(err));
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })



module.exports.client = client;