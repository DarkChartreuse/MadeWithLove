const User = require('./db/models/index.js').users;
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const qs = require('querystring');
const request = require('request');
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

const CLIENT_ID = 'ca_8kQux35EriTK7xxw2Bvhcuz0PXwpP0rw';
const API_KEY = 'sk_test_y1L0h0zWW6KNvLpMHi5yOKoD';

const TOKEN_URI = 'https://connect.stripe.com/oauth/token';
const AUTHORIZE_URI = 'https://connect.stripe.com/oauth/authorize';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authController.globalSessionMiddleware);
app.use(session({ secret: 'onionsarerare', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// if (process.env.TYPE === 'sender') {
//   var url = 'http://' + MWL_PORT_3000_TCP_ADDR + '3000';
//   request.get(url, function(err, res) {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(res.body);
//     }
//   });
// }

 // pass passport for configuration

// // TODO: change static paths
// app.use(express.static(path.join(__dirname, '../')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });
require('./routes.js')(app, express);

app.get('/authorize', (req, res) => {
  // Redirect to Stripe /oauth/authorize endpoint
  res.redirect(`${AUTHORIZE_URI}?${qs.stringify({
    response_type: 'code',
    scope: 'read_write',
    client_id: CLIENT_ID,
  })}`);
});

app.get('/oauth/callback', (req, res) => {
  const code = req.query.code;

  request.post({
    url: TOKEN_URI,
    form: {
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      code,
      client_secret: API_KEY,
    },
  }, (err, r, body) => {
    User.findOne({ where: { id: req.session.user.id } })
        .then(user => {
          if (user) {
            user.updateAttributes({
              access_token: JSON.parse(body).access_token,
              refresh_token: JSON.parse(body).refresh_token,
              token_type: JSON.parse(body).token_type,
              stripe_publishable_key: JSON.parse(body).stripe_publishable_key,
              stripe_user_id: JSON.parse(body).stripe_user_id,
              scope: JSON.parse(body).scope,
            });
            console.log('う～ザー', user);
    // For demo's sake, output in response:
            res.redirect('/addmeal');
            // res.writeHead(301,
            //   { Location: 'http://localhost:3000/addmeal' }
            // );
            // res.end();
          }
        });
  });
});

app.use(express.static(path.resolve(`${__dirname}/../dist`)));


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(port, () => {
  console.log('Server now connected to port ', port);
});

module.exports = app;
