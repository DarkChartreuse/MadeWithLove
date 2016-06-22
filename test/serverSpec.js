const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server/server.js');

const Order = require('../server/db/controllers/ordersController.js');
const User = require('../server/db/controllers/usersController.js');

describe('', function() {

  beforeEach(function(done) {
    // test Sequelize database
    // app
    //   .authenticate()
    //   .then(function(err) {
    //     console.log('Connection has been established successfully.');
    //   })
    //   .catch(function (err) {
    //     console.log('Unable to connect to the database:', err);
    //   })
    //   .finally(function() {
    //     done();
    //   });


    /*
    // Log out currently signed in user
    request(app)
      .get('/logout')
      .end(function(err, res) {

        // Delete objects from db so they can be created later for the test
        Link.remove({url: 'http://www.roflzoo.com/'}).exec();
        User.remove({username: 'Savannah'}).exec();
        User.remove({username: 'Phillip'}).exec();

        done();
      });
      */
    done();
  });

  describe('User creation: ', function() {

    it('Creates a user in the database', function(done) {
      request(app)
        .post('/api/users')
        .send({
          firstName: 'Sunny',
          lastName: 'Gonnabathula',
          email: 'sunny@sunny.com',
          description: 'Serving up some sick algorithms sucka!!!!',
          phone: '(516)327-4494',
          password: 'sunnygonnabathula',
          address: '676 Atlantic Avenue, Floral Park, NY',
          zip: '11001',
          profile: 'https://avatars2.githubusercontent.com/u/2055636?v=3&s=460',
          chef: true,
        })
        .expect(200)
        // .expect(function(res) {
        //   console.log(res);
        //   // expect(res.body.code).to.be.ok;
        //   // expect(res.body.email).to.equal('sunny@sunny.com');
        // })
        .end(done);
    });

    xdescribe('Shortening links:', function() {

      xit('Responds with the short code', function(done) {
        request(app)
          .post('/links')
          .send({
            'url': 'http://www.roflzoo.com/'})
          .expect(200)
          .expect(function(res) {
            expect(res.body.url).to.equal('http://www.roflzoo.com/');
            expect(res.body.code).to.be.ok;
          })
          .end(done);
      });

      xit('New links create a database entry', function(done) {
        request(app)
          .post('/links')
          .send({
            'url': 'http://www.roflzoo.com/'})
          .expect(200)
          .expect(function(res) {
            Link.findOne({'url': 'http://www.roflzoo.com/'})
              .exec(function(err, link) {
                if (err) { console.log(err); }
                expect(link.url).to.equal('http://www.roflzoo.com/');
              });
          })
          .end(function() {
            done();
          });
      });

      xit('Fetches the link url title', function(done) {
        request(app)
          .post('/links')
          .send({
            'url': 'http://www.roflzoo.com/'})
          .expect(200)
          .expect(function(res) {
            Link.findOne({'url': 'http://www.roflzoo.com/'})
              .exec(function(err, link) {
                if (err) { console.log(err); }
                expect(link.title).to.equal('Funny pictures of animals, funny dog pictures');
              });
          })
          .end(done);
      });

    }); // 'Shortening Links'

    xdescribe('With previously saved urls: ', function() {

      beforeEach(function(done) {
        link = new Link({
          url: 'http://www.roflzoo.com/',
          title: 'Funny pictures of animals, funny dog pictures',
          baseUrl: 'http://127.0.0.1:4568',
          visits: 0
        });

        link.save(function() {
          done();
        });
      });

      xit('Returns the same shortened code if attempted to add the same URL twice', function(done) {
        var firstCode = link.code;
        request(app)
          .post('/links')
          .send({
            'url': 'http://www.roflzoo.com/'})
          .expect(200)
          .expect(function(res) {
            var secondCode = res.body.code;
            expect(secondCode).to.equal(firstCode);
          })
          .end(done);
      });

      xit('Shortcode redirects to correct url', function(done) {
        var sha = link.code;
        request(app)
          .get('/' + sha)
          .expect(302)
          .expect(function(res) {
            var redirect = res.headers.location;
            expect(redirect).to.equal('http://www.roflzoo.com/');
          })
          .end(done);
      });

    }); // 'With previously saved urls'

  }); // 'Link creation'

  xdescribe('Priviledged Access:', function() {

    // /*  Authentication  */
    // // TODO: xit out authentication
    xit('Redirects to login page if a user tries to access the main page and is not signed in', function(done) {
      request(app)
        .get('/')
        .expect(302)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/login');
        })
        .end(done);
    });

    xit('Redirects to login page if a user tries to create a link and is not signed in', function(done) {
      request(app)
        .get('/create')
        .expect(302)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/login');
        })
        .end(done);
    });

    xit('Redirects to login page if a user tries to see all of the links and is not signed in', function(done) {
      request(app)
        .get('/links')
        .expect(302)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/login');
        })
        .end(done);
    });

  }); // 'Privileged Access'

  xdescribe('Account Creation:', function() {

    xit('Signup creates a new user', function(done) {
      request(app)
        .post('/signup')
        .send({
          'username': 'Svnh',
          'password': 'Svnh' })
        .expect(302)
        .expect(function() {
          User.findOne({'username': 'Svnh'})
            .exec(function(err, user) {
              expect(user.username).to.equal('Svnh');
            });
        })
        .end(done);
    });

    xit('Successful signup logs in a new user', function(done) {
      request(app)
        .post('/signup')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .expect(302)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/');
          request(app)
            .get('/logout')
            .expect(200);
        })
        .end(done);
    });

  }); // 'Account Creation'

  xdescribe('Account Login:', function() {

    beforeEach(function(done) {
      new User({
        'username': 'Phillip',
        'password': 'Phillip'
      }).save(function() {
        done();
      });
    });

    xit('Logs in existing users', function(done) {
      request(app)
        .post('/login')
        .send({
          'username': 'Phillip',
          'password': 'Phillip' })
        .expect(302)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/');
        })
        .end(done);
    });

    xit('Users that do not exist are kept on login page', function(done) {
      request(app)
        .post('/login')
        .send({
          'username': 'Fred',
          'password': 'Fred' })
        .expect(302)
        .expect(function(res) {
          expect(res.headers.location).to.equal('/login');
        })
        .end(done);
    });

  }); // Account Login

});
