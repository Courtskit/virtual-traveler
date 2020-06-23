'use strict';

///////////////////LIBRARIES/////////////////////////////////
const express = require('express');
const superagent = require('superagent');
require('ejs');
require('dotenv').config();
const app = express();
const pg = require('pg');
const PORT = process.env.PORT || 3001;
const client = new pg.Client(process.env.DATABASE_URL);

// helper file module
const help = require('./helper');


function Location(city, geo) {
  this.search_query = city;
  this.formatted_query = geo.display_name;
  this.latitude = geo.lat;
  this.longitude = geo.lon;
}

function handler(req, res) {


  const city = req.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEO_DATA_API_KEY}&q=${city}&format=json`;
  let sql = `SELECT * FROM locations WHERE search_query LIKE ($1);`;
  let searchValues = [city];

  client.query(sql, searchValues)
    .then(store => {
      if (store.rows[0]) {
        res.status(200).send(store.rows[0]);
      } else {
        superagent.get(url)
          .then(finalLocationStuff => {
            let location = new Location(city, finalLocationStuff)
            let sqlAdd = `INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);`;
            let searchValues = [city, location.formatted_query, location.latitude, location.longitude]
            client.query(sqlAdd, searchValues)
            res.render('../pages/searches.ejs', {
              locationData: location
            });
          }).catch(error => {
            errorHandler(error, req, res);
          });
      }
    }).catch(error => {
      errorHandler(error, req, res);
    });
}

module.exports.handler = handler;