var dbAddress = "mongodb://localhost:27017";


var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var restify = require("express-restify-mongoose");



mongoose.connection.on('connected', function () {
 	console.log('Mongoose default connection open to ' + dbAddress);
 	console.log("Adding dummy data...");
 	addDummyData();
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
										twit.newDirectMessage(data.direct_message.sender.id, "Thank you! Your response has been recieved and we will let you know when the requestor has reviewed it." + parsedTaskResult.tag, function (err){
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



function addDummyData() {
    var user1 = new User({
        name: {
            first: 'Jim',
            last: 'Schwartz'
        }
    })
    var user2 = new User({
        name: {
            first: 'Worker',
            last: 'Bob'
        }
    });

    var names = [{
        first: 'Jim',
        last: 'Schwartz'
    }, {
        first: 'Worker',
        last: 'Bob'
    }, {
        first: 'Jordan',
        last: 'Lop'
    }, {
        first: 'Seth',
        last: 'Little'
    }, {
        first: 'Alice',
        last: 'Cry'
    }, ];

    var tasks = [{
        description: "Good place to get coffee",
        type: "Short answer",
        tag: "ABCD"
    }, {
        description: "Good place to get food",
        type: "Short answer",
        tag: "FAWD"
    }, {
        description: "Favorite color",
        type: "Short answer",
        tag: "GDSE"
    }, {
        description: "Favorite band",
        type: "Short answer",
        tag: "FEFS"
    }, {
        description: "New good movie",
        type: "Short answer",
        tag: "GRSF"
    }, {
        description: "What's a good TV show",
        type: "Short answer",
        tag: "DSDF"
    }, {
        description: "What is the meaning of life",
        type: "Short answer",
        tag: "KFOK"
    }, {
        description: "Commander data",
        type: "Short answer",
        tag: "LWOQ"
    }, {
        description: "How big is the universe",
        type: "Short answer",
        tag: "POEJ"
    }, {
        description: "Where can I sleep in Gates",
        type: "Short answer",
        tag: "KFEI"
    }, ];

    var response = [
        "Peets", "Starbucks", "Chipotle", "Taco Bell", "Red", "Blue", "Radiohead", "Drake", "Wolf of Wall Street", "The Matrix", "Breaking Bad",
        "Game of Thrones", "Nothing", "Coding lines on lines on lines", "What?", "Exactly.", "Too big", "Not big enough",
        "not the 6th floor", "hide somewhere"
    ];

    // create users
    for (var i = 0; i < 5; i++) {
        var user = new User({
            name: {
                first: names[i].first,
                last: names[i].last
            }
        });
        user.save(function (err) {
            if (err) console.log(err);

            // Create tasks
            for (var j = 0; j < 10; j++) {
                // create a task
                var data = tasks[j];
                var numTasks = Math.floor((Math.random() * 10) + 1);
                var reward = Math.floor((Math.random() * 100) + 1);
                var task = new Task({
                    owner: user._id,
                    numTasks: numTasks,
                    reward: reward,
                    description: data.description,
                    type: data.type,
                    tag: data.tag
                });

                task.save();

            }
        });
    }
}
