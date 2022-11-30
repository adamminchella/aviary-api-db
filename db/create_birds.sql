DROP TABLE IF EXISTS birds;

CREATE TABLE birds (
    id SERIAL PRIMARY KEY,
    name varchar(100) NOT NULL,
    age INT
);