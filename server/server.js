const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const authController = require('./db/controllers/authController.js');
const session = require('express-session');
require('./passport')(passport);


const app = express();
const port = process.env.PORT || 3000;
// const compiler = webpack(config);
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
// app.use(webpackHotMiddleware(compiler));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authController.globalSessionMiddleware);
app.use(session({ secret: 'onionsarerare', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

 // pass passport for configuration

// // TODO: change static paths
// app.use(express.static(path.join(__dirname, '../')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });
require('./routes.js')(app, express);

app.use(express.static(path.resolve(`${__dirname}/../dist`)));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(port, () => {
  console.log('Server now connected to port ', port);
});

module.exports = app;
