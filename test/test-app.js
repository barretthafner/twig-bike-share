'use strict';
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app.js').app;

var expect = chai.expect;

chai.use(chaiHttp);

describe('Open Bike Project', function() {

	it('', function(done) {

	});

	//home page should load when not logged in
	//redirect to home page when other routes are called and not logged in
	//log in
	//redirect from home to admin if logged in
	//logout

	// Bikes

	// view bike index
	// render /bikes/new
	// add bike if post on /bikes/new, redirect to /bikes
	// render /bikes/:id/edit
	// update on put /bikes/:id, redirect to /bikes
	// test go back buttons
	// destroy on delete request to /bikes/:id and redirect to /subscribers

	// Subscribers

	// view subscriber index
	// render /subscriber/new
	// add subscriber if post on /subscribers/new, redirect to /subscribers
	// render /subscribers/:id/edit
	// update on put /subscriber/:id, redirect to /subscribers
	// test go back buttons
	// destroy on delete request to /subscribers/:id and redirect to /subscribers
	// send new validation code button
	// clear numnber
	// set to active to false
	// generate new validation code
	// send new validation code to subscriber via email
	// redirect to /subscribers

	// test mongoose promises
  // assert.equal(query.exec().constructor, global.Promise);

	// 404 page


});
