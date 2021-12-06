'use strict';

///////////////////LIBRARIES/////////////////////////////////
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const pg = require('pg');
const PORT = process.env.PORT || 3001;
const methodOverride = require('method-override');
const client = new pg.Client("postgres://duqbmhpzblhjfx:fca264512a9d6ac17c078ccadd0ecaaac33dc73404d60c9344c8830d26d16a32@ec2-52-20-248-222.compute-1.amazonaws.com:5432/de9d3k734nsrc0");
require('ejs');

// allows ejs to work - look in views folder for your template
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(cors());

// this allows us to see the request.body
app.use(express.urlencoded({
  extended: true
}));

// serve files from public folder
app.use(express.static('./public'));

////////////////////////MODULES//////////////////////////////
const info = require('./libs/info.js');
const help = require('./libs/helper.js');

/////////////////ROUTES//////////////////////
app.get('/', searchForm);
app.get('/searches', info.handler);
app.post('/pages', addToDatabase);
app.get('/favorites', showFavorites);
app.get('/delete/:travel_id', deleteFavoriteLocation);

// Function to remove a favorited location from the database.
function deleteFavoriteLocation(request, response) {

  let id = request.params.travel_id;
  let sql = 'DELETE FROM travel WHERE id=$1;';
  let safeVals = [id];

  client.query(sql, safeVals)
    .then(sqlResults => {
      response.redirect(`/favorites`);
    }).catch(err => error(err, response));
}

// function to display the home page when the user opens the website.
function searchForm(request, response) {
  response.render('pages/index.ejs');
}

// function to add the selected location to the favorites page. 
// When the user selected 'add to favorites', the location name and 
// img url will be pushed into the database. 
function addToDatabase(request, response) {
  let name = request.body.name;
  let sql = 'SELECT * FROM travel WHERE name = $1;';
  let safeValue = [name];
  client.query(sql, safeValue)
    .then(result => {
      if (result.rowCount < 1) {
        let {
          name,
          imgUrl
        } = request.body;
        let sqlAdd = 'INSERT INTO travel (name, image_url) VALUES ($1, $2) RETURNING id;';
        let safeValues = [name, imgUrl];
        client.query(sqlAdd, safeValues)
          .then(store => {
            let id = store.rows[0].id;
            response.status(200).redirect(`/searches`)
          }).catch(error => console.log(error))
      } else {
        response.status(200).redirect(`/searches`)
      }
    }).catch(error => console.log(error))
}

// function to display the favorited locations on the favorites.ejs page. 
// this info is pulled from the existing database info.
function showFavorites(request, response) {

  let sql = 'SELECT * FROM travel;';
  client.query(sql)
    .then(display => {
      response.status(200).render('./pages/favorites.ejs', {
        favorites: display.rows
      });
    }).catch(err => help.err(err, response));
}

///////////////////CONNECT//////////////////////
client.on('error', err => console.log(err));
client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  }).catch();
