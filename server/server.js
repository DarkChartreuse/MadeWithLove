const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
require('./passport')(passport);

const app = express();
const port = process.env.PORT || 3000;
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({ secret: 'onionsarerare' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

 // pass passport for configuration

// // TODO: change static paths
// app.use(express.static(path.join(__dirname, '../')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

require('./routes.js')(app, express);

app.listen(port, () => {
  console.log('Server now connected to port ', port);
});

module.exports = app;
