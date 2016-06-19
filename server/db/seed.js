var pg = require('pg');
var connectionString = "postgres://postgres:@localhost:5432/mwl_db";
var seedUsers = require('./seedData/seedUsers.js');
var seedOrders = require('./seedData/seedOrders.js');

var client = new pg.Client(connectionString);
client.connect();

client.query('DROP TABLE IF EXISTS users');
client.query('DROP TABLE IF EXISTS orders');

var initUsersString = `
  CREATE TABLE IF NOT EXISTS users(
    id          SERIAL PRIMARY KEY NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL,
    phone       VARCHAR(15) NOT NULL,
    password    TEXT NOT NULL,
    address     TEXT NOT NULL,
    zip         VARCHAR(5) NOT NULL,
    chef        BOOLEAN,
    num_orders  INT,
    avg_rating  REAL,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP
  )`;

var initOrdersString = `
  CREATE TABLE IF NOT EXISTS orders(
    id          SERIAL PRIMARY KEY NOT NULL,
    id_user     INT NOT NULL,
    id_chef     INT NOT NULL,
    food        TEXT NOT NULL,
    price       MONEY NOT NULL,
    address     TEXT NOT NULL,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP
  )`;

// initialize tables for 'users' and 'orders'
client.query(initUsersString);
client.query(initOrdersString);

var usersEntry = `INSERT INTO users(
  first_name, last_name, email, phone, password,
  address, zip, chef)
  values($1, $2, $3, $4, $5, $6, $7, $8)
`;

for (var i = 0; i < seedUsers.length; i++) {
  var qValues = [];
  for (var key in seedUsers[i]) {
    qValues.push(seedUsers[i][key]);
  }
  // insert 'users' seed data
  client.query(usersEntry, qValues);
}

var ordersEntry = `INSERT INTO orders(
  id_user, id_chef, food, price, address, time)
  values($1, $2, $3, $4, $5, $6)
`;

for (var i = 0; i < seedOrders.length; i++) {
  var qValues = [];
  for (var key in seedOrders[i]) {
    qValues.push(seedOrders[i][key]);
  }
  // insert 'orders' seed data
  client.query(ordersEntry, qValues);
}

var query = client.query("SELECT * FROM users");

query.on('row', function(row) {
  console.log(row);
});

query.on('end', function() {
  client.end();
});
