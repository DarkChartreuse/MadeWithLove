CREATE DATABASE mwl_db;
CREATE USER postgres;
GRANT ALL PRIVILEGES ON DATABASE postgres TO mwl_db;
CREATE TABLE users
(
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    description varchar(255),
    phone varchar(255),
    password varchar(255),
    address varchar(255),
    zip varchar(255),
    profile varchar(255),
    chef boolean,
    num_orders int default 0,
    avg_rating int default 0
);
CREATE TABLE orders
(
    id_user int,
    id_chef int,
    id_meal varchar(255),
    food varchar(255),
    cuisine varchar(255),
    description varchar(255),
    quantity int,
    price float,
    address varchar(255),
    order_date timestamp,
    rating int,
    review varchar(255),
    image varchar(255)
);
