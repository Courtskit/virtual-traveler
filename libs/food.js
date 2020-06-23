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
  this.city = obj.location.city;
  this.country = obj.location.country;
  this.price = obj.price;
  this.rating = obj.rating;
  this.url = obj.image_url;
}

function handler(req, res) {
  // console.log('HELLO');
  // console.log(req.query);
  let search = req.query.search;
  console.log(req.query, 'first console log')
  let url = `https://api.yelp.com/v3/businesses/search`;
  let queryParams = {
    location: search,
    term: 'food',
    limit: 5
  }

  // "location": {
  //   "address1": "800 N Point St",
  //   "address2": "",
  //   "address3": "",
  //   "city": "San Francisco",
  //   "zip_code": "94109",
  //   "country": "US",
  //   "state": "CA",
  //   "display_address": [
  //     "800 N Point St",
  //     "San Francisco, CA 94109"
  //   ],
  //   "cross_streets": ""
  // },

  // grab food data from yelp api
  superagent.get(url)
    .set('Authorization', 'Bearer ' + process.env.YELP_API_KEY)
    .query(queryParams)
    .then(data => {
      let foodData = data.body.businesses;
      console.log(data.body, 'second console log')
      let food = foodData.map(val => new Restaurant(val));
      res.render('pages/city.ejs', {
        foodData: food
      });
    }).catch(err => help.err(err, res));
}

// export module
module.exports.handler = handler;