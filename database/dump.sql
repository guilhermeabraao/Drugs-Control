CREATE DATABASE drugstore;

CREATE TABLE drugs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    expiration_date DATE NOT NULL,
    image text NOT NULL
);