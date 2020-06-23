DROP TABLE IF EXISTS virtual_traveler;

CREATE TABLE locations
(
  id SERIAL PRIMARY KEY,
  search_query VARCHAR(255),
  formatted_query VARCHAR(255),
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7)
);

INSERT INTO locations
  (
  search_query,
  formatted_query,
  latitude,
  longitude
  )

-- CREATE TABLE food
-- (
--   id SERIAL PRIMARY KEY,
--   VARCHAR
--   (255),
--   VARCHAR
--   (255),
-- );

VALUES
  (
    'Seattle',
    'Seattle, King County, Washington, USA',
    '47.6038321',
    '-122.3300624'
);

SELECT *
FROM virtual_traveler;