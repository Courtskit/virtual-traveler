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
function Photo(obj) {
  this.img = obj.urls.regular;
}
function handler(req, res) {

  let search = req.query.search;
  let url = `https://api.unsplash.com/photos?query=${search}&order_by=popular&client_id=${process.env.UNSPLASH_API_KEY}`
  console.log("HELLO");
  superagent.get(url)
    .then(data => {
      let photo = new Photo(data.body[0]);
      console.log(photo);
      // res.render('pages/city.ejs', {
      //   photoData: photo
      // })
    }).catch(err => help.err(err, res));
}
module.exports.handler = handler;