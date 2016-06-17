var pg = require('pg');

var connectionString = "postgres://DSF:@localhost:5432/mwl_db";

var client = new pg.Client(connectionString);
client.connect();

var qString = `CREATE TABLE IF NOT EXISTS users(
  id          SERIAL PRIMARY KEY NOT NULL,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       VARCHAR(10) NOT NULL,
  password    TEXT NOT NULL,
  address     TEXT NOT NULL,
  chef        BOOLEAN,
  num_orders  INT,
  avg_rating  REAL
)`;

client.query(qString);

qString = `INSERT INTO users(
  first_name, last_name, email, phone, password,
  address, chef, num_orders, avg_rating)
  values($1, $2, $3, $4, $5, $6, $7, $8, $9)
`;

var testValue = 0;

var qValues = [
  'Ronald', 'McDonald', 'ron@mcdonald.com', 5551234567, 'somepassword',
  '123 address st, state, ca', false, testValue, 0.0
];

for (var i = 0; i < 5; i++) {
  client.query(qString, qValues);
  qValues[7]++;
}

var query = client.query("SELECT * FROM users");
//fired after last row is emitted

query.on('row', function(row) {
  console.log(row);
});

query.on('end', function() {
  client.end();
});


/** to be refactored in later
var pgp = require('pg-promise');
var db = require('./db.js');

var qString = `CREATE TABLE IF NOT EXISTS users(
  id          SERIAL PRIMARY KEY NOT NULL,
  first_name  TEXT NOT NULL,
  last_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       VARCHAR(10) NOT NULL,
  password    TEXT NOT NULL,
  address     TEXT NOT NULL,
  chef        BOOLEAN,
  num_orders  INT,
  avg_rating  REAL
)`;

db.any(qString)
  .then(function (data) {
    console.log(data); // print new user id;
  })
  .catch(function (error) {
    console.log("ERROR:", error.message || error); // print error;
  });


// performance-optimized, reusable set of columns:
var colSet = new pgp.helpers.ColumnSet(['first_name', 'last_name', 'email', 'phone', 'password', 'address', 'chef', 'num_orders', 'avg_rating'], {table: 'users'});

// input values:
var dummyData = [
  {
    first_name: 'Ronald',
    last_name: 'McDonald',
    email: 'ron@mcdonald.com',
    phone: 5551234567,
    password: 'somepassword',
    address: '123 address st, state, ca',
    chef: false,
    num_orders: 0,
    avg_rating: 0.0
  },
  {
    first_name: 'Alex',
    last_name: '',
    email: '',
    phone: ,
    password: '',
    address: '',
    chef: false,
    num_orders: 0,
    avg_rating: 0.0
  },
  {
    first_name: '',
    last_name: '',
    email: '',
    phone: ,
    password: '',
    address: '',
    chef: false,
    num_orders: 0,
    avg_rating: 0.0
  },
  {
    first_name: '',
    last_name: '',
    email: '',
    phone: ,
    password: '',
    address: '',
    chef: false,
    num_orders: 0,
    avg_rating: 0.0
  },
];


// generating a multi-row insert query:
var query = pgp.helpers.insert(dummyData, colSet);
//=> INSERT INTO "tmp"("col_a","col_b") VALUES('a1','b1'),('a2','b2')

// executing the query:
db.none(query)
  .then(data=> {
      // success;
  })
  .catch(error=> {
      // error;
  });


qString = `INSERT INTO users(
  first_name, last_name, email, phone, password,
  address, chef, num_orders, avg_rating)
  values($1, $2, $3, $4, $5, $6, $7, $8, $9)
`;

var testValue = 0;

var qValues = [
  'Ronald', 'McDonald', 'ron@mcdonald.com', 5551234567, 'somepassword',
  '123 address st, state, ca', false, testValue, 0.0
];

db.none(qString, qValues)
  .then(function(results) {

  })
  .catch(function(err) {
    console.error('Error: could not seed users table', err);
  });
**/
