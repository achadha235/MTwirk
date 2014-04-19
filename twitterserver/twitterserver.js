// This server controls our communication with Twitter. Look below for API.

var dbAddress = "mongodb://localhost:27017";

var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var restify = require("express-restify-mongoose");
var twitter = require('ntwitter'); // https://github.com/AvianFlu/ntwitter
var twit = new twitter({
  consumer_key: 'RLBtBZOdvllHApo2QQrRcA',
  consumer_secret: 'wAvVUeUzjYGO30mdJ4typVKHWSlgnJNadEuVQD84U',
  access_token_key: '2369737250-Jisy0DdIayprPfY4QPY6PPLhzKmLrmhDWVDIsw6',
  access_token_secret: 'w2ESUSuPphQnarq9FFpqeT97Ksc1ZvqGrnvnnwrahs16m'
});

var parameters = {
	rementionName: "Mtwirk"
}

twit
	.verifyCredentials(function (err, data) {
	console.log (data);
})



/* Streams we need
	1. All hashtags #mt
*/




mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + dbAddress);
});

mongoose.connect(dbAddress);

var User = require('../models/user');
var Task = require("../models/task");

var express = require('express');
var flash    = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// MTwirk Server for making Requests for Twitter

/* HTTP API
POST /sendMessage - {request: , user: } 
POST /publishJob - publish a users request to Twitter. Responses 
	- 400 if account dosnt have sufficient funds or
		   Twitter 


Internals:
requestToTweet("")



*/











app.configure(function(){
	app.set("port", 3001)
	app.use(express.logger('dev')); 
	app.use(express.cookieParser()); 
	app.use(express.bodyParser()); 
	app.use(express.session({ secret: 'twirktwirktwirkmileymileytwirk' })); 
	
});


app.get( '/app/*' , function (req, res, next) {
    var file = req.params[0]; 
    res.sendfile( __dirname + '/app/' + file );
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("MTwirk server server listening on port " + app.get('port'));
});




