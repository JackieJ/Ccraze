module.exports = function (app) {
  app.get('/', function(req, res) {
    res.render('index', { title: 'The index page!' })
  });
  app.get('/jawbone', function(req, res) {
    res.render('jawbone', { title: 'The index page!' })
  });
  app.get('/jawbonelogin', function(req, res) {
    res.render('jawbonelogin', { title: 'The index page!' })
  });
};
