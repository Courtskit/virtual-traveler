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

/////////////////MAPS API TEST///////////////////////////


// mapboxgl.accessToken =
//   'pk.eyJ1IjoiYW5kcmV3Y3MxNDkiLCJhIjoiY2tic2drb3ljMDFkZTJ5cnAwNGEwY2NlaiJ9.wByLSI3WzhKbfx8NvguW7g';


// var map = new mapboxgl.Map({
//   container: 'map',
//   style: 'mapbox://styles/mapbox/streets-v11',
//   center: [-71.157895, 42.707741],
//   zoom: 11.15
// });

// function loadMap() {
//   mapboxgl.accessToken;
//   map;
// }

// <% var test = latLng %>
// <% console.log(test) %>
// <script>
//   mapboxgl.accessToken =
//     'pk.eyJ1IjoiYW5kcmV3Y3MxNDkiLCJhIjoiY2tic2drb3ljMDFkZTJ5cnAwNGEwY2NlaiJ9.wByLSI3WzhKbfx8NvguW7g';
//   var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: test,
//     zoom: 11.15
//   });
// </script>

// module.exports.loadMap = loadMap;