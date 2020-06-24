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
const help = require('./helper.js');

// constructor 
// TODO: sort them by their rating
function Restaurant(obj) {
  this.name = obj.name;
  this.city = obj.location.city;
  this.state = obj.location.state;
  this.country = obj.location.country;
  this.price = obj.price;
  this.rating = obj.rating;
  this.url = obj.image_url;
}

function Photo(obj) {
  this.img = obj.urls.regular;
}

function handler(req, res) {

  let search = req.query.search;
  let unsplashUrl = `https://api.unsplash.com/photos?query=${search}&order_by=popular&client_id=${process.env.UNSPLASH_API_KEY}`

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
      let coords = data.body.region.center;
      let coordsArr = [coords.longitude, coords.latitude];
      let food = foodData.map(val => new Restaurant(val));
      res.render('pages/city.ejs', {
        foodData: food,
        latLng: coordsArr

      });
      
    }).catch(err => help.err(err, res));
}

// export module
module.exports.handler = handler;