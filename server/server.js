var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// // TODO: change static paths
// app.use(express.static(path.join(__dirname, './client', 'public')));

require('./routes.js')(app, express);

app.listen(port, function() {
  console.log('Server now connected to port ', port);
});
