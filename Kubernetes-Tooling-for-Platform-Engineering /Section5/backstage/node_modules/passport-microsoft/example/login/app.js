var express = require('express')
  , passport = require('passport')
  , MicrosoftStrategy = require('passport-microsoft').Strategy
  , morgan = require('morgan')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , session = require('express-session');

var MICROSOFT_GRAPH_CLIENT_ID = '---your--microsoft--graph--client--id---';
var MICROSOFT_GRAPH_CLIENT_SECRET = '---your--microsoft--graph--client--secret--';
var MICROSOFT_GRAPH_TENANT_ID = 'common'; // or '---your--microsoft--graph--client--secret--';


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete Microsoft graph profile is
//   serialized and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


// Use the MicrosoftStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and profile),
//   and invoke a callback with a user object.
passport.use(new MicrosoftStrategy({
  clientID: MICROSOFT_GRAPH_CLIENT_ID,
  clientSecret: MICROSOFT_GRAPH_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/microsoft/callback',
  scope: ['user.read'],
  
  // Optional, uses 'common' as the default
  tenant: MICROSOFT_GRAPH_TENANT_ID,
},
function (accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {

    // To keep the example simple, the user's Microsoft Graph profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the Microsoft account with a user record in your database,
    // and return that user instead.
    return done(null, profile);
  });
}
));

var app = express();

// Basic Express configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ 
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function (req, res) {
  res.render('index', { user: req.user });
});

app.get('/account', ensureAuthenticated, function (req, res) {
  res.render('account', { user: req.user });
});

app.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});

// GET /auth/microsoft
//   Use passport.authenticate() as route middleware to authenticate the
//   request. The first step in Microsoft Graph authentication will involve
//   redirecting the user to the common Microsoft login endpoint. After authorization, Microsoft
//   will redirect the user back to this application at /auth/microsoft/callback
app.get('/auth/microsoft',
  passport.authenticate('microsoft', {
    // Optionally add any authentication params here
    // prompt: 'select_account'
  }),
  // eslint-disable-next-line no-unused-vars
  function (req, res) {
    // The request will be redirected to Microsoft for authentication, so this
    // function will not be called.
  });

// GET /auth/microsoft/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/microsoft/callback',
  passport.authenticate('microsoft', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  });

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.use(express.static(__dirname + '/public'));

app.listen(3000);

console.log('App running on http://localhost:3000');

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
