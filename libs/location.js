'use strict';

///////////////////LIBRARIES/////////////////////////////////
const express = require('express');
const superagent = require('superagent');
require('ejs');
require('dotenv').config();
const app = express();
const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);

// modules
const help = require('./helper');
const db = require('../server.js');


function Location(city, geo) {
  this.name = city;
  this.formatted_query = geo.display_name;
  this.latitude = geo.lat;
  this.longitude = geo.lon;
}

function handler(req, res) {

  console.log(req);
  const city = req.query.search;
  const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEO_DATA_API_KEY}&q=${city}&format=json`;
  let sql = `SELECT * FROM locations WHERE search_query LIKE ($1);`;
  let searchValues = [city];

  superagent.get(url)
    .query(city)
    .then(finalLocationStuff => {



      let location = new Location(city, finalLocationStuff)



      // let sqlAdd = `INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);`;
      // let searchValues = [city, location.formatted_query, location.latitude, location.longitude]
      // client.query(sqlAdd, searchValues)
      console.log(location);
      res.render('pages/searches.ejs', {
        locationData: location
      });
    }).catch(err => help.err(err, res));
}

module.exports.handler = handler;