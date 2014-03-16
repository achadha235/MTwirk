var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var dbAddress = "mongodb://localhost:27017";

mongoose.connection.on('connected', function () {
 	console.log('Mongoose default connection open to ' + dbAddress);
});
mongoose.connect(dbAddress);

// Models - just users (workers) for now
var User = require('./models/user');

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
	app.use(passport.initialize());
	app.use(passport.session()); 
	app.use(flash());
});


require('./routes/routes.js')(app, passport);

// Redirect to /dist/index.html in production
app.get('/', function (req, res){
	res.sendfile(__dirname + "/app/index.html");
});

app.get( '/app/*' , function (req, res, next) {
    var file = req.params[0]; 
    res.sendfile( __dirname + '/app/' + file );
});

// Start Twirking
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log("MTwirk server server listening on port " + app.get('port'));
});

