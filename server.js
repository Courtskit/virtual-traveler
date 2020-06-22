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
app.set('view engine', 'ejs');

// this allows us to see the request.body
app.use(express.urlencoded({
  extended: true
}));

// serve files from public folder
app.use(express.static('./public'));
// allows ejs to work - look in views folder for your template

////////////////////////MODULES//////////////////////////////
const food = require('./libs/food.js');
const help = require('./libs/helper');

///////////////////ROUTES//////////////////////
app.get('/food', food.handler);
// app.get('/location', );

// Testing
app.get('/', function (request, response) {
  response.send('Hello - I like PIZZA')
})

///////////////////CONNECT//////////////////////
client.on('error', err => console.log(err));
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })