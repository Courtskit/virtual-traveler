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

// constructor for nps gov (parks)
function Parks(obj) {
  this.name = obj.name;
  this.description = obj.operatingHours[0].description
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

  let npsGovUrl = `https://developer.nps.gov/api/v1/parks?q=${search}&api_key=${process.env.NPS_GOV_API_KEY}&limit=5`

  // console.log(teleportUrl);
  
  // gather api data from teleport api and yelp api
  let data;
  let data2;
  let data3;
  try {
    let teleportUrl = `https://api.teleport.org/api/urban_areas/slug:${search}/images/`;
    [data, data2, data3] = await Promise.all([
      superagent.get(yelpUrl).set('Authorization', 'Bearer ' + process.env.YELP_API_KEY).query(queryParams),
      superagent.get(teleportUrl),
      superagent.get(npsGovUrl)
    ]).catch(err => console.log('error', err));
    
  } catch {
    let teleportUrl = `https://api.teleport.org/api/urban_areas/slug:dallas/images/`;
    [data, data2, data3] = await Promise.all([
      superagent.get(yelpUrl).set('Authorization', 'Bearer ' + process.env.YELP_API_KEY).query(queryParams),
      superagent.get(teleportUrl),
      superagent.get(npsGovUrl)
    ]).catch(err => console.log('error', err));
  }
  
  // compile returned data
  let parkData = data3.body.data;
  let coords = data.body.region.center;
  let coordsArr = [coords.longitude, coords.latitude];
  let foodData = data.body.businesses;

  // create new instances
  let parks = parkData.map(val => new Parks(val))
  let food = foodData.map(val => new Restaurant(val));
  let pic = new Photo(data2.body);
  

  // render all info to city.ejs page
  res.render('pages/city.ejs', {
    foodData: food,
    latLng: coordsArr,
    cityPic: pic.imgUrl,
    parkInfo: parks
  });
}

// export module
module.exports.handler = handler;

//TODO: create if logic for city images that do not have a url