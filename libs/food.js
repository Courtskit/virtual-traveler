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

// constructor 
// TODO: sort them by their rating
function Restaurant(obj) {
  this.name = obj.name;
  this.price = obj.price;
  this.rating = obj.rating;
  this.url = obj.image_url;
}

function handler(req, res) {
  let search = req.query.search;
  let url = `https://api.yelp.com/v3/businesses/search`;
  let queryParams = {
    location: search,
    term: 'food',
    limit: 5
  }

  // grab food data from yelp api
  superagent.get(url)
    .set('Authorization', 'Bearer ' + process.env.YELP_API_KEY)
    .query(queryParams)
    .then(data => {
      let foodData = data.body.businesses;
      let food = foodData.map(val => new Restaurant(val));
      res.render('pages/searches.ejs', {
        foodData: food
      });
    }).catch(err => help.err(err, res));
}

// export module
module.exports.handler = handler;