module.exports = function (app) {
  app.get('/', function(req, res) {
    res.render('index', { title: 'The index page!' })
  });
  app.get('/register', function(req, res) {
    res.render('register', { title: 'Register Page' })
  });
  app.get('/jawbone', function(req, res) {
    res.render('jawbone', { title: 'The index page!' })
  });
  app.get('/jawbonelogin', function(req, res) {
    res.render('jawbonelogin', { title: 'The index page!' })
  });
  app.get('/test', function(req, res){
    res.render('test', {title: 'testing page!'})
  });
};
