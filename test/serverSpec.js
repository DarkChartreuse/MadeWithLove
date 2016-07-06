process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const app = require('../server/server.js');
const db = require('../server/db/models/index.js');

const Meal = require('../server/db/controllers/mealsController.js');
const User = require('../server/db/controllers/usersController.js');


before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Get /', function() {
  it('should return a 200 response', function(done) {
    request(app).get('/')
    .expect(200, done)
  });
});

describe('Users', function() {
  
  it('should create a new user', function(done) {
    request(app).post('/api/users')
    .send({
      first_name: 'Andrew',
      last_name: 'Fung',
      email: 'andrew@andrew.com',
      description: 'They call me the Wu-shef; adding plenty of kick to your meals!',
      phone: '(812)133-8036',
      password: 'andrewfung',
      address: '229 Evergreen Drive, Bloomington, IN',
      zip: '47401',
      profile: 'https://avatars3.githubusercontent.com/u/15877600?v=3&s=460',
      chef: true
  })
    .expect(200)
    .expect(function(results) {
      // console.log('>>>>>>>>>>> results: ', results.body);
      expect(results.statusCode).to.be.ok;
      expect(results.body.email).to.equal('andrew@andrew.com');
      expect(results.body.first_name).to.equal('Andrew');
    })
    .end(done);
  })

  it('should list a SINGLE user /api/user/:id GET', function(done) {
    request(app).get('/api/users/1')
    .end(function(err, res) {
      // console.log('THIS IS THE RESPONSE >>>', res);
      expect(res.statusCode).to.be.ok;
      expect(res.body.first_name).to.equal('Andrew');
      expect(res.body.email).to.equal('andrew@andrew.com');
      done();
    });
  }); 

  it('should update a SINGLE user /api/updateuser/:id PUT', function(done) {
    request(app).put('/api/users/1')
    .send({
      email: 'andrew@gmail.com'
    })
    .end(function(err, res) {
      // console.log('THIS IS THE RESPONSE >>>', res.body);
      expect(res.statusCode).to.be.ok;
      expect(res.body).to.have.property('UPDATED');
      expect(res.body.UPDATED.email).to.equal('andrew@gmail.com');
      done();
    });
  });

  it('should delete a SINGLE user /api/user/:id delete', function(done) {
    request(app).delete('/api/users/1')
    .end(function(err, res) {
      // console.log('THIS IS THE RESPONSE >>>', res);
      expect(res.statusCode).to.be.ok;
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.equal('success');
      done();
    });
  });  

});


// describe('Persistent Node Chat Server', function() {
//   var dbConnection;

//   beforeEach(function(done) {
//     dbConnection = mysql.createConnection({
//       user: 'root',
//       password: '',
//       database: 'chat'
//     });
//     dbConnection.connect();

//        var tablename = ""; // TODO: fill this out

//     /* Empty the db table before each test so that multiple tests
//      * (or repeated runs of the tests) won't screw each other up: */
//     dbConnection.query('truncate ' + tablename, done);
//   });

//   afterEach(function() {
//     dbConnection.end();
//   });




      // request({
      //   method: 'POST',
      //   uri: 'http://127.0.0.1:3000/classes/messages',
      //   json: {
      //     username: 'Valjean',
      //     message: 'In mercy\'s name, three days is all I need.',
      //     roomname: 'Hello'
      //   }
      // }, function () {
      //   // Now if we look in the database, we should find the
      //   // posted message there.

      //   // TODO: You might have to change this test to get all the data from
      //   // your message table, since this is schema-dependent.
      //   var queryString = 'SELECT * FROM messages';
      //   var queryArgs = [];

      //   dbConnection.query(queryString, queryArgs, function(err, results) {
      //     // Should have one result:
      //     expect(results.length).to.equal(1);

      //     // TODO: If you don't have a column named text, change this test.
      //     expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

      //     done();
// describe('', function() {

  // beforeEach(function(done) {
    //
    // db.sync()

    // // Log out currently signed in user
    // request(app)
    //   .get('/logout')
    //   .end(function(err, res) {
    //
    //     // Delete objects from db so they can be created later for the test
    //     Link.remove({url: 'http://www.roflzoo.com/'}).exec();
    //     User.remove({username: 'Savannah'}).exec();
    //     User.remove({username: 'Phillip'}).exec();
    //
    //     done();
    //   });

  //   done();
  // });

//   describe('User creation: ', function() {

//     it('Creates a user in the database', function(done) {
//       request(app)
//         .post('/api/users')
//         .send({
//           first_name: 'Andrew',
//           last_name: 'Fung',
//           email: 'andrew@andrew.com',
//           description: 'They call me the Wu-shef; adding plenty of kick to your meals!',
//           phone: '(812)133-8036',
//           password: 'andrewfung',
//           address: '229 Evergreen Drive, Bloomington, IN',
//           zip: '47401',
//           profile: 'https://avatars3.githubusercontent.com/u/15877600?v=3&s=460',
//           chef: true
//         })
//         .expect(200)
//         .expect(function(results) {
//           console.log('>>>>>>>>>>> results: ', results.body);
//           // expect(results.statusCode).to.be.ok;
//           expect(results.body.email).to.equal('andrew@andrew.com');
//         })
//         .end(done);
//     });
// });
//     xdescribe('Shortening links:', function() {

//       xit('Responds with the short code', function(done) {
//         request(app)
//           .post('/links')
//           .send({
//             'url': 'http://www.roflzoo.com/'})
//           .expect(200)
//           .expect(function(res) {
//             expect(res.body.url).to.equal('http://www.roflzoo.com/');
//             expect(res.body.code).to.be.ok;
//           })
//           .end(done);
//       });

//       xit('New links create a database entry', function(done) {
//         request(app)
//           .post('/links')
//           .send({
//             'url': 'http://www.roflzoo.com/'})
//           .expect(200)
//           .expect(function(res) {
//             Link.findOne({'url': 'http://www.roflzoo.com/'})
//               .exec(function(err, link) {
//                 if (err) { console.log(err); }
//                 expect(link.url).to.equal('http://www.roflzoo.com/');
//               });
//           })
//           .end(function() {
//             done();
//           });
//       });

//       xit('Fetches the link url title', function(done) {
//         request(app)
//           .post('/links')
//           .send({
//             'url': 'http://www.roflzoo.com/'})
//           .expect(200)
//           .expect(function(res) {
//             Link.findOne({'url': 'http://www.roflzoo.com/'})
//               .exec(function(err, link) {
//                 if (err) { console.log(err); }
//                 expect(link.title).to.equal('Funny pictures of animals, funny dog pictures');
//               });
//           })
//           .end(done);
//       });

//     }); // 'Shortening Links'

//     xdescribe('With previously saved urls: ', function() {

//       beforeEach(function(done) {
//         link = new Link({
//           url: 'http://www.roflzoo.com/',
//           title: 'Funny pictures of animals, funny dog pictures',
//           baseUrl: 'http://127.0.0.1:4568',
//           visits: 0
//         });

//         link.save(function() {
//           done();
//         });
//       });

//       xit('Returns the same shortened code if attempted to add the same URL twice', function(done) {
//         var firstCode = link.code;
//         request(app)
//           .post('/links')
//           .send({
//             'url': 'http://www.roflzoo.com/'})
//           .expect(200)
//           .expect(function(res) {
//             var secondCode = res.body.code;
//             expect(secondCode).to.equal(firstCode);
//           })
//           .end(done);
//       });

//       xit('Shortcode redirects to correct url', function(done) {
//         var sha = link.code;
//         request(app)
//           .get('/' + sha)
//           .expect(302)
//           .expect(function(res) {
//             var redirect = res.headers.location;
//             expect(redirect).to.equal('http://www.roflzoo.com/');
//           })
//           .end(done);
//       });

//     }); // 'With previously saved urls'

//   }); // 'Link creation'

//   xdescribe('Priviledged Access:', function() {

//     // /*  Authentication  */
//     // // TODO: xit out authentication
//     xit('Redirects to login page if a user tries to access the main page and is not signed in', function(done) {
//       request(app)
//         .get('/')
//         .expect(302)
//         .expect(function(res) {
//           expect(res.headers.location).to.equal('/login');
//         })
//         .end(done);
//     });

//     xit('Redirects to login page if a user tries to create a link and is not signed in', function(done) {
//       request(app)
//         .get('/create')
//         .expect(302)
//         .expect(function(res) {
//           expect(res.headers.location).to.equal('/login');
//         })
//         .end(done);
//     });

//     xit('Redirects to login page if a user tries to see all of the links and is not signed in', function(done) {
//       request(app)
//         .get('/links')
//         .expect(302)
//         .expect(function(res) {
//           expect(res.headers.location).to.equal('/login');
//         })
//         .end(done);
//     });

//   }); // 'Privileged Access'

//   xdescribe('Account Creation:', function() {

//     xit('Signup creates a new user', function(done) {
//       request(app)
//         .post('/signup')
//         .send({
//           'username': 'Svnh',
//           'password': 'Svnh' })
//         .expect(302)
//         .expect(function() {
//           User.findOne({'username': 'Svnh'})
//             .exec(function(err, user) {
//               expect(user.username).to.equal('Svnh');
//             });
//         })
//         .end(done);
//     });

//     xit('Successful signup logs in a new user', function(done) {
//       request(app)
//         .post('/signup')
//         .send({
//           'username': 'Phillip',
//           'password': 'Phillip' })
//         .expect(302)
//         .expect(function(res) {
//           expect(res.headers.location).to.equal('/');
//           request(app)
//             .get('/logout')
//             .expect(200);
//         })
//         .end(done);
//     });

//   }); // 'Account Creation'

//   xdescribe('Account Login:', function() {

//     beforeEach(function(done) {
//       new User({
//         'username': 'Phillip',
//         'password': 'Phillip'
//       }).save(function() {
//         done();
//       });
//     });

//     xit('Logs in existing users', function(done) {
//       request(app)
//         .post('/login')
//         .send({
//           'username': 'Phillip',
//           'password': 'Phillip' })
//         .expect(302)
//         .expect(function(res) {
//           expect(res.headers.location).to.equal('/');
//         })
//         .end(done);
//     });

//     xit('Users that do not exist are kept on login page', function(done) {
//       request(app)
//         .post('/login')
//         .send({
//           'username': 'Fred',
//           'password': 'Fred' })
//         .expect(302)
//         .expect(function(res) {
//           expect(res.headers.location).to.equal('/login');
//         })
//         .end(done);
//     });

//   }); // Account Login

// });
