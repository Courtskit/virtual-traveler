DROP TABLE IF EXISTS travel;

CREATE TABLE travel
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  image_url VARCHAR(255)
);

SELECT *
FROM travel;