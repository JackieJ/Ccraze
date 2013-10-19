/** Module dependencies **/
var express             = require('express')
, http                  = require('http')
, path                  = require('path')
, Firebase              = require('firebase')
, passport              = require('passport')
, LocalStrategy = require('passport-local').Strategy;

var app = express();

var dataRef = new Firebase('https://zephoku.firebaseIO.com/');
dataRef.set("hello world!");

// All Environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.compress());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());

app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//app.set('env','production');
app.set('env','development');

// Development Only
app.configure('development', function(){
  app.locals.pretty = true;
  app.use(express.errorHandler());
})

// Production Only
app.configure('production', function(){
  app.locals.pretty = false;
})
app.post('/login',
  passport.authenticate('local', 
    { successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true })
);

// Routes
require('./routes/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
