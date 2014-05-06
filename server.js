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
	
	app.use("/", express.static(__dirname + "/frontend/app"));

	app.use(passport.initialize());
	app.use(passport.session()); 
	app.use(flash());

	restify.serve(app, User, {middleware: isAuthenticated, plural: false, lowercase: true});
	restify.serve(app, Task, {middleware: isAuthenticated, plural: false, lowercase: true});	

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




