'use strict';

///////////////////LIBRARIES//////////////////////
const express = require('express');
const superagent = require('superagent');
require('ejs');
require('dotenv').config();
const app = express();
const pg = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;
const client = new pg.Client(process.env.DATABASE_URL);

///////////////////ROUTES//////////////////////
// this allows us to see the request.body
app.use(express.urlencoded({ extended: true }));
// serve files from public folder
app.use(express.static('public'));
// allows ejs to work - look in views folder for your template
app.set('view engine', 'ejs');

// Testing
app.get('/', function (request, response) {
  response.send('Hello - I like PIZZA')
})


///////////////////CONNECT//////////////////////
const errorAlert = (err, response) => {
  response.status(500).send('Sorry, something went wrong');
  console.log('error', err);
}
client.on('error', err => console.log(err));
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    })
  })