function Location(city, geo) {
  this.search_query = city;
  this.formatted_query = geo.display_name;
  this.latitude = geo.lat;
  this.longitude = geo.lon;
}

app.get('/location', (request, response) => {
  const city = request.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${process.env.GEOCODE_API_KEY}&q=${city}&format=json`;
  let sql = `SELECT * FROM locations WHERE search_query LIKE ($1);`;
  let searchValues = [city];

  client.query(sql, searchValues)
    .then(store => {
      if (store.rows[0]) {
        response.status(200).send(store.rows[0]);
      } else {
        superagent.get(url)
          .then(finalLocationStuff => {
            let location = new Location(city, finalLocationStuff)
            let sqlAdd = `INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4);`;
            let searchValues = [city, location.formatted_query, location.latitude, location.longitude]
            dbClient.query(sqlAdd, searchValues)
            response.status(200).send(location);
          }).catch(error => {
            errorHandler(error, request, response);
          });
      }
    }).catch(error => {
      errorHandler(error, request, response);
    });
});