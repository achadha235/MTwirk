// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;

var User = require('../models/user');
var Task = require('../models/task');
var TaskResult = require('../models/taskresult');

// Drop (REMOVE THIS)
var dbg = true;
if (dbg) {
  User.remove({}, function (err) {console.log('DEBUG: User collection removed.')});
  Task.remove({}, function (err) {console.log('DEBUG: Task collection removed.')});
  TaskResult.remove({}, function (err) {console.log('DEBUG: TaskResult collection removed.')});
}

// Keys/Secrets
var configAuth = require('./auth');

module.exports = function(passport) {

    // Serialize
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('twitter', new TwitterStrategy({
        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function (req, token, tokenSecret, profile, done) {
        process.nextTick(function() {
            if (!req.user) {
                User.findOne({ 'twitter.id' : profile.id }, function (err, user) {
                    if (err) return done(err);
                    if (user) {
                        if (!user.twitter.token) {
                            user.twitter.token       = token;
                            user.twitter.username    = profile.username;
                            user.twitter.displayName = profile.displayName;
                            user.save(function(err) {
                                if (err) {
                                    throw err;
                                }
                                return done(null, user);
                            });
                        }
                        return done(null, user); // user found, return that user
                    } else {
                        var newUser                 = new User();
                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;

                        newUser.save(function(err) {
                            if (err) {
                                throw err;
                            } else {
                                console.log("User saved", newUser);
                            }
                            console.log("Returning")
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user                 = req.user; // pull the user out of the session

                user.twitter.id          = profile.id;
                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;

                user.save(function(err) {
                    if (err) {
                        throw err;
                    }
                });

                return done(null, req.user);

            }

        });

    }));

};
