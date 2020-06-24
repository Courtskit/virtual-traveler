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
const info = require('./libs/info.js');
const help = require('./libs/helper.js');
const pic = require('./libs/photos.js');

///////////////////ROUTES//////////////////////
app.get('/', searchForm);
app.get('/searches', info.handler);
// app.get('/searches', pic.handler)
app.post('/pages', addToDatabase);

// test
// app.get('/searches', pic.handler);
// app.get('/pages/:id', bookRequest);

function searchForm(request, response) {
  response.render('pages/index.ejs');
}

function addToDatabase(request, response) {
  let sql = 'SELECT * FROM locations WHERE name = $1;';
  let safeValue = [request.body.name];
  client.query(sql, safeValue)
    .then(result => {
      if (!result.rowCount) {
        let {
          name,
          image_url
        } = request.body;
        let sqlAdd = 'INSERT INTO locations (name, image_url) VALUES ($1, $2) RETURNING id;';
        let safeValues = [name, image_url];
        client.query(sqlAdd, safeValues)
          .then(store => {
            let id = store.rows[0].id;
            response.status(200).redirect(`/pages/${id}`)
          }).catch(error => console.log(error))
      } else {
        response.status(200).redirect(`/pages/${result.rows[0].id}`);
      }
    })
}

function locationRequest(request, response) {
  let id = request.params.id;
  let sql = 'SELECT * FROM books WHERE id=$1;';
  let safeValues = [id];
  dbClient.query(sql, safeValues)
    .then(display => {
      response.status(200).render('./pages/favorites.ejs', {
        homeArray: display.rows
      });
    }).catch(error => errorHandler(error, request, response))
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