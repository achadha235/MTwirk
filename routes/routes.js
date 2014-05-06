module.exports = function (app, passport) {
	var User = require('../models/user');

	app.post('/login', passport.authenticate('twitter', {
		successRedirect : '/#/account',
		failureRedirect : '/#/login',
		failureFlash : true
	}));

	app.get('/login', function (req, res){
		if (req.user){
			res.redirect('/#/account');
		} else {
			res.redirect('/#/login');
		}
	});

	app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

	app.get('/auth/twitter/callback',
	  passport.authenticate('twitter', {
		successRedirect : '/#/hits',
		failureRedirect : '/#/login',
		failureFlash : true
	  })
	);

	app.get('/me', function(req, res) {
		if (!!req.user) {
			res.json({user: req.user, loggedIn: true});
		} else {
			res.json({error: "User not logged in", loggedIn: false});
		}
	});

	app.get('/error', function (req, res){
		res.json({ success: false });
	});




// REST API


// request:



}
