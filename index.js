const express = require('express')
const path = require('path');

const app = express()

const port = process.env.PORT || 8000

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })