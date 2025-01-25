/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const passport = require('passport');
const AtlassianStrategy = require('../');

// Configure Atlassian OOuth2 strategy for use by Passport.
passport.use(new AtlassianStrategy({
  clientID: 'gZUApVepYymWPyW0ZUTeeW2XuT3UOyyW',
  clientSecret: 'YIqqHQ1jQsF03YTqKZwFloRqTzWVDfWknEwAkhqi-SHz59UXZL8STzAp0slUWzSu',
  callbackURL: 'http://localhost:8080/auth/atlassian/callback',
  scope: 'offline_access read:jira-user',
}, (accessToken, refreshToken, profile, cb) => {
  // Profile should be stored to the database in real applications
  console.log(JSON.stringify(profile, null, 2));
  cb(null, profile);
}));

// Dummy serialization/desiarialization
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

const app = express();
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/atlassian', passport.authenticate('atlassian'));

app.get('/auth/atlassian/callback', passport.authenticate('atlassian', { failureRedirect: '/error' }), (req, res) => {
  // Successfull authorization, redirect user to profile page
  res.redirect('/profile-page');
});

app.get('/profile-page', (req, res) => {
  res.send('It works!');
});

app.get('/error', (req, res) => {
  res.send('Authorization error :(');
});

app.listen(8080, () => console.log('server started on port 8080'));
