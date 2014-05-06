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

var User = require('../models/user');
var Task = require("../models/task");
var TaskResult = require("../models/taskresult");

var cache = {};
var activeTasks = {};

var parameters = {
	rementionName: "Mtwirk",
	credentialVerification: undefined,
}

console.log("LOG: Connecting to Twitter...")
twit.verifyCredentials( function (err, data) {
	if (err){
		console.log("ERROR: There was an error: ", err);
	} else {
		console.log("LOG: Connected to Twitter!");
		parameters.credentialVerification = data;
	}
});

twit.stream('user', {track:'Mtwirk'}, function (stream) {
	stream.on('data', function (data) {
		console.log("LOG: Recieved Data.");
		handleTwitterData(data);
	});
	stream.on('end', function (response) {
		console.log("LOG: Stream ended");
	// Handle a disconnection
	});
	stream.on('destroy', function (response) {
		console.log("LOG: Stream ended prematurely");
	});
});

function handleTwitterData(data){
	console.log(data);

	// Check if the object has a user and some text
	if (data.user && data.text){
		console.log("LOG: Processing data for ", data.user.screen_name, " Text: ", data.text);
		var parsedTaskResult = parseTwitterResult(data);
		if (parsedTaskResult.valid === true){
			console.log("Valid", parsedTaskResult.valid);
			// 2. Save the result to the databas

			var newTaskResult = TaskResult(parsedTaskResult);
			newTaskResult.save(function (err){
				if (err){
					console.log("LOG: Error");
				} else {
					console.log("LOG: Task result saved");
				}
			});
		}
	}
}

// Returns a TaskResult object from Twitter Data
function saveTwitterResult(data){
	var result = {
		tag: null,
		data: null
	};
	function isTaskTag(tag) { return /^#(?=\w{4})/.test(tag)}			
	function isMtwirkTag(tag) { return (tag === "mtwirk")}
	var taskTag = "";
	var hasTag = false;
	for (var i = 0; i < data.entities.hashtags.length; i++){
		var tag = data.entities.hashtags[i];
		if (isTaskTag(tag.text)){
			result.tag = tag.text;	
			// Find associated user and job and then save it to the __dirnam
		}
	}
	return result;
}


/* Streams we need
	1. All hashtags #mt
*/







mongoose.connection.on('connected', function () {
	console.log('Mongoose default connection open to ' + dbAddress);
});

mongoose.connect(dbAddress);

var User = require('../models/user');
var Task = require("../models/task");
var TaskResult = require("../models/taskresult")

var express = require('express');
var flash    = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = express();

// MTwirk Request API

/* HTTP API
POST /sendMessage - {request: , user: } 
POST /publishJob - publish a users request to Twitter. Responses 
	- 400 if account dosnt have sufficient funds or
		   Twitter 
Internals:
requestToTweet("")
*/

app.post("/sendMessage", function (req, res){
	/* if (isRequested(req.body)){
		var result = parseResult
	} */
	User.findOne({id: req.user.id}, function (err, user){
		if (err){
			console.log("LOG: An error occured", err);
		} else {
			console.log("LOG: User found. Sending message to ", user.twitter.username, " using Mtwirk", "data: ")
		}
	})
	res.send(500);
});

function isRequester(data){
	return true;
}

function isAuthenticated(res, req, next){
	if (req.isAuthenticated()){
		return next();		
	} else {
		res.send(402);
	}
}

function balanceSufficient(res, req, next){
	return next();
}
















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