process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const TestUtils = require('react/addons').addons.TestUtils;
const Signin = require('../client/auth/Signin.js');

describe('SiginTest', function () {

it("renders an h1", function () {
    var component = TestUtils.renderIntoDocument(
        <Signin />
    );

    var h3 = TestUtils.findRenderedDOMComponentWithTag(
       Signin, 'h3'
    );

    expect(h3.getDOMNode().textContent).toEqual("login");
});