var connect = require('connect');
var http = require('http');
var apicache = require('../lib/apicache').options({ debug: true });
var cache = apicache.middleware;

var app = module.exports = function(expiration) {
  var app = connect();

  var movies = [{
    title: 'The Prestige',
    director: 'Christopher Nolan',
  },{
    title: 'Schindler\'s List',
    director: 'Steven Spielberg'
  }];

  app.use(cache(expiration));

  app.use('/api/movies', function(req, res) {
    app.requestsProcessed++;

    res.write(JSON.stringify(movies));
    res.end();
  });

  app.use('/api/movies/:index', function(req, res) {
    app.requestsProcessed++;

    res.write(JSON.stringify(movies[index]));
    res.end();
  });

  app.apicache = apicache;
  app.requestsProcessed = 0;

  return app;
};