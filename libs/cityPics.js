// https://maps.googleapis.com/maps/api/place/photo?parameters

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

function Photo(obj) {
  this.photo = obj.photos[0].image.web;
}

function handler(req, res) {

  let search = req.query.search;
  let url = `https://api.teleport.org/api/urban_areas/slug:${search}/images/`;

  // get data from api
  superagent.get(url)
    .then(data => {
      let pic = new Photo(data.body);
      console.log(pic);
      res.send(pic);
      res.render('pages/city.ejs', {
        cityPic: pic
      });
    }).catch(err => help.err(err, res));
}

module.exports.handler = handler;