module.exports = function (app, passport) {
	var User = require('../models/user');
	var Task = require('../models/task');
	var TaskResult = require('../models/taskresult');

	app.post('/login', passport.authenticate('twitter', {
		successRedirect : '/#/account',
		failureRedirect : '/#/login',
		failureFlash : true
	}));

	app.get('/login', function (req, res){
		if (req.user){
			res.redirect('/#/hits');
		} else {
			res.redirect('/#/login');
		}
	});

	app.get('/connect/twitter', passport.authorize('twitter', { 
		scope : 'email' 
	}));

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

// Rest API
// Todo: security? later.
app.get('/api/user', function (req, res){
	return User.find(function (err, user) {
		if (!err) {
			return res.send(user);
		} else {
			return console.log(err);
		}
	});
});

app.post('/api/user', function (req, res) {
    var user;
    user = new User(req.body);
    user.save(function (err) {
        if (!err) {
            return console.log("User created");
        } else {
            return console.log(err);
        }
    });
    return res.send(user);
});

app.get('/api/user/:id', function (req, res) {
    return User.findById(req.params.id, function (err, user) {
        if (!err) {
            return res.send(user);
        } else {
            return console.log(err);
        }
    });
});

app.put('/api/user/:id', function (req, res) {
    return User.findById(req.params.id, function (err, user) {
        for (key in req.body) {
            console.log(req.body)
            user[key] = req.body[key]
        }
        return user.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(user);
        });
    });
});


// Tasks
app.get('/api/task', function (req, res){
	return Task.find(function (err, task) {
		if (!err) {
			return res.send(task);
		} else {
			return console.log(err);
		}
	});
});

app.post('/api/task', function (req, res) {
    var task;
    task = new Task(req.body);
    task.save(function (err) {
        if (!err) {
            return console.log("task created");
        } else {
            return console.log(err);
        }
    });
    return res.send(task);
});

app.get('/api/task/:id', function (req, res) {
    return Task.findById(req.params.id, function (err, task) {
        if (!err) {
            return res.send(task);
        } else {
            return console.log(err);
        }
    });
});

app.put('/api/task/:id', function (req, res) {
    return Task.findById(req.params.id, function (err, task) {
        for (key in req.body) {
            console.log(req.body);
            task[key] = req.body[key];
        }
        return task.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(task);
        });
    });
});


// TaskResults

app.get('/api/taskresult', function (req, res){
	return TaskResult.find(function (err, task) {
		if (!err) {
			return res.send(task);
		} else {
			return console.log(err);
		}
	});
});


app.post('/api/taskresult', function (req, res) {
    var taskresult;
    taskresult = new TaskResult(req.body);
    taskresult.save(function (err) {
        if (!err) {
        	// Publish to Twitter
            return console.log("taskresult created");
        } else {
            return console.log(err);
        }
    });
    return res.send(taskresult);
});

app.get('/api/taskresult/:id', function (req, res) {
    return TaskResult.findById(req.params.id, function (err, taskresult) {
        if (!err) {
        	// Update from twitter
            return res.send(taskresult);
        } else {
            return console.log(err);
        }
    });
});

app.put('/api/taskresult/:id', function (req, res) {
    return TaskResult.findById(req.params.id, function (err, taskresult) {
        for (key in req.body) {
            taskresult[key] = req.body[key]
        }
        return taskresult.save(function (err) {
            if (!err) {
                console.log("updated");
            } else {
                console.log(err);
            }
            return res.send(taskresult);
        });
    });
});












}



