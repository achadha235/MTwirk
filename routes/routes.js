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
			res.redirect('/#/login')
		}
	});

	app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

	app.get('/auth/twitter/callback',
	  passport.authenticate('twitter', {
		successRedirect : '/#/account', 
		failureRedirect : '/#/login', 
		failureFlash : true
	  })
	);


	app.get('/error', function (req, res){
		res.json({ success: false });
	})



}
