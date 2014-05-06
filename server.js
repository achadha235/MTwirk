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
var TaskResult = require('./models/taskresult');

var express = require('express');
var flash    = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

require('./config/passport')(passport);

var app = express();

function isAuthenticated(req, res, next){
	if (req.isAuthenticated()){
		return next()
	} else {
		res.send(401);
	}
}

app.configure(function(){
	app.set("port", process.env.PORT || 3000)
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.set('view engine', 'ejs');
	app.use(express.session({ secret: 'twirktwirktwirkmileymileytwirk' }));

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());

	restify.serve(app, User, {middleware: isAuthenticated, plural: false, lowercase: true});
	restify.serve(app, Task, {middleware: isAuthenticated, plural: false, lowercase: true});

});

require('./routes/routes.js')(app, passport);

app.get('/', function (req, res){
	res.sendfile(__dirname + "/mobile/app/views/main.html");
});

app.get( '/app/*' , function (req, res, next) {
    var file = req.params[0];
    res.sendfile( __dirname + '/app/' + file );
});

var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("MTwirk server server listening on port " + app.get('port'));
});

function addDummyData() {
  var user1 = new User({name: {first: 'Jim', last: 'Schwartz'}})
  var user2 = new User({name: {first: 'Worker', last: 'Bob'}});

  var names = [
  { first: 'Jim', last: 'Schwartz' },
  { first: 'Worker', last: 'Bob' },
  { first: 'Jordan', last: 'Lop' },
  { first: 'Seth', last: 'Little' },
  { first: 'Alice', last: 'Cry' },
  ];

  var tasks = [
    {description: "Good place to get coffee", type: "Short answer", tag: "ABCD"},
    {description: "Good place to get food", type: "Short answer", tag: "FAWD"},
    {description: "Favorite color", type: "Short answer", tag: "GDSE"},
    {description: "Favorite band", type: "Short answer", tag: "FEFS"},
    {description: "New good movie", type: "Short answer", tag: "GRSF"},
    {description: "What's a good TV show", type: "Short answer", tag: "DSDF"},
    {description: "What is the meaning of life", type: "Short answer", tag: "KFOK"},
    {description: "Commander data", type: "Short answer", tag: "LWOQ"},
    {description: "How big is the universe", type: "Short answer", tag: "POEJ"},
    {description: "Where can I sleep in Gates", type: "Short answer", tag: "KFEI"},
  ];

  var response = [
    "Peets", "Starbucks", "Chipotle", "Taco Bell" , "Red", "Blue", "Radiohead", "Drake", "Wolf of Wall Street", "The Matrix", "Breaking Bad",
    "Game of Thrones", "Nothing", "Coding lines on lines on lines", "What?", "Exactly.", "Too big", "Not big enough",
    "not the 6th floor", "hide somewhere"];

  // create users
  for (var i = 0; i < 5; i++) {
    var user = new User({name: {first: names[i].first, last: names[i].last}});
    user.save(function(err) {
      if (err) console.log(err);
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

          task.save(function(err) {
            if (err) console.log(err);
            // add the task to the user's task list
            User.findOneAndUpdate({_id: user._id}, {$push: {'tasksRequested' : task._id}}, {upsert: true}, function(err, data) {
              if (err) console.log(err);
            });

            // create task responses
            for (var k = 0; k < 20; k++) {
              var resp = new TaskResult({tag: tasks[Math.floor(k/2)], data: {response: response[k]}});
              resp.save(function(err) {
                if (err) console.log(err);
                // add to the task's responses
                Task.findOneAndUpdate({_id: task._id}, {$push: {'results' : resp._id}}, {upsert: true}, function(err, data) {
                  if (err) console.log(err);
                });
              });
            }

          });

      }
    });
  }

  // setTimeout(function() {
  //   Task.find({}, function(err, users) {
  //     console.log(users);
  //   });
  // }, 1000);

};

setTimeout(addDummyData, 1000);
