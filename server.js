var dbAddress = "mongodb://localhost:27017";


var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var restify = require("express-restify-mongoose");



mongoose.connection.on('connected', function () {
 	console.log('Mongoose default connection open to ' + dbAddress);
});

mongoose.connect(dbAddress);

var User = require('./models/user');
var Task = require("./models/task");
var TaskResult = require("./models/taskresult")

var express = require('express');
var flash    = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('./config/passport')(passport);

var app = express();


app.configure(function(){
	app.set("port", process.env.PORT || 3000)
	app.use(express.logger('dev')); 
	app.use(express.cookieParser()); 
	app.use(express.bodyParser()); 
	app.set('view engine', 'ejs'); 
	app.use(express.session({ secret: 'twirktwirktwirkmileymileytwirk' })); 
	
	app.use("/", express.static(__dirname + "/frontend/app"));

	app.use(passport.initialize());
	app.use(passport.session()); 
	app.use(flash());
});

require('./routes/routes.js')(app, passport);

// app.get('/', function (req, res){
// 	res.sendfile(__dirname + "/frontend/app");
// });

app.get( '/app/*' , function (req, res, next) {
    var file = req.params[0]; 
    res.sendfile( __dirname + '/app/' + file );
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("MTwirk server server listening on port " + app.get('port'));
});


var twitter = require('ntwitter'); // https://github.com/AvianFlu/ntwitter
var twit = new twitter({
	consumer_key: 'RLBtBZOdvllHApo2QQrRcA',
	consumer_secret: 'wAvVUeUzjYGO30mdJ4typVKHWSlgnJNadEuVQD84U',
	access_token_key: '2369737250-Jisy0DdIayprPfY4QPY6PPLhzKmLrmhDWVDIsw6',
	access_token_secret: 'w2ESUSuPphQnarq9FFpqeT97Ksc1ZvqGrnvnnwrahs16m'
});


var parameters = {
	rementionName: "Mtwirk",
	credentialVerification: undefined,
}

// twit.verifyCredentials( function (err, data) {
// 	if (err){
// 		console.log("ERROR: There was an error: ", err);
// 	} else {
// 		console.log("LOG: Connected to Twitter!");
// 		parameters.credentialVerification = data;
// 	}
// });

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
	if (data.event === "follow"){
		twit.createFriendship(data.source.id, function (err){
			if (err){
				console.log("There was an error: ", err)
			} else {
				User.findOne({"twitter.id":data.source.id_str}, function (err, user){
					if (err){
						console.log(err)
					} else {
						console.log("Updating status to following")
						user.status = "following";
						console.log(err)
						user.save(function (err, doc){
							if (err !== null) {
								console.log("there was an error")
							}
						});

					}
				})
			}
		})
	}

	// Check if the object has a user and some text
	if (data.direct_message !== undefined){
		var parsedTaskResult = parseTwitterResult(data);
		console.log(parsedTaskResult)

		if (parsedTaskResult.valid === true){
			var newTaskResult = TaskResult(parsedTaskResult);
			Task.findOne({"tag": parsedTaskResult.tag}, function (err, task){
				if (err){
					console.log(err)
				} else {

					if (task !== null){
						// Send invalid notification
						newTaskResult.save(function (err, record){
							if (err){
								console.log(err)
							} else {
								task.results.push(newTaskResult)
								task.save(function (err){
									if (err === null) {
										twit.newDirectMessage(data.direct_message.sender.id, "Thank you for completing task " + parsedTaskResult.tag, function (err){
											console.log(err)
										}) 		
									} else {
										twit.newDirectMessage(data.direct_message.sender.id, "There was an error ", function (err){
											console.log(err)
										}) 									
										console.log(err)
									}
								})
							}
						})
					} else {
						twit.newDirectMessage(data.direct_message.sender.id, "Incorrect Task ID. Please ensure response correctly tagged.", function (err){
							console.log(err)
						}) 
					}					
				}
			})
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
function parseTwitterResult(data){
	var result = {
		worker: data.direct_message.sender.id_str,
		data: data.direct_message.text,
		tag: null,
		valid: false
	};

	function isTaskTag(tag) { return /^[a-zA-Z]{4}$/i.test(tag)}			
	var taskTag = "";
	var hasTag = false;

	for (var i = 0; i < data.direct_message.entities.hashtags.length; i++){
		var tag = data.direct_message.entities.hashtags[i];
		if (isTaskTag(tag.text)){
			result.tag = tag.text;
			result.valid = true	
		}
	}
	return result;
}






