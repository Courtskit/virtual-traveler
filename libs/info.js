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
  this.yelpUrl = obj.image_url;
}

// constructor for city photo
function Photo(obj) {
  this.imgUrl = obj.photos[0].image.web;
}

// function to grab api data from two separate sources and render them 
// to the city.ejs file at the same time. 
async function handler(req, res) {

  let search = req.query.search;
  let yelpUrl = `https://api.yelp.com/v3/businesses/search`;
  let queryParams = {
    location: search,
    term: 'food',
    limit: 5
  }

  let teleportUrl = `https://api.teleport.org/api/urban_areas/slug:seattle/images/`;

  // if image does not exist, use this as default image
  if (!teleportUrl) {
    teleportUrl = `https://api.teleport.org/api/urban_areas/slug:seattle/images/`;
  }

  // gather api data from teleport api and yelp api
  const [data, data2] = await Promise.all([
    superagent.get(yelpUrl).set('Authorization', 'Bearer ' + process.env.YELP_API_KEY).query(queryParams),
    superagent.get(teleportUrl)
  ]).catch(err => console.log('error', err));

  let coords = data.body.region.center;
  let coordsArr = [coords.longitude, coords.latitude];
  let foodData = data.body.businesses;

  // create new instances
  let food = foodData.map(val => new Restaurant(val));
  let pic = new Photo(data2.body);

  res.render('pages/city.ejs', {
    foodData: food,
    latLng: coordsArr,
    cityPic: pic.imgUrl
  });
}

// export module
module.exports.handler = handler;