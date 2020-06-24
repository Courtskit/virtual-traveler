DROP TABLE IF EXISTS travel;

CREATE TABLE travel
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  image_url VARCHAR(255)
);

INSERT INTO travel
  (
  name,
  image_url
  )

VALUES
  (
    'value 1',
    'value 2'
);

SELECT *
FROM travel;