// Generated by CoffeeScript 1.6.3
(function() {
  module.exports = function(app) {
    var video_route;
    video_route = require('./video');
    video_route(app);
    app.get('/', function(req, res) {
      return res.redirect('/video');
    });
    app.get('/404.html', function(req, res) {
      return res.end('404 error');
    });
    app.get('/install', function(req, res) {
      if (!global.db) {
        res.end('install failed, Database is not connected!');
        return;
      }
      return global.db.collection('counters').insert([
        {
          _id: 'video_id',
          seq: 1000
        }, {
          _id: 'barrage_id',
          seq: 0
        }
      ], function(err, item) {
        if (err) {
          return res.end(err.message);
        } else {
          return res.end('install successfully!');
        }
      });
    });
    app.get('/resources/:filename', function(req, res) {
      var path;
      path = require('path');
      return res.sendfile(path.join(__dirname, '../uploads/' + req.params.filename));
    });
    return app.post('/upload', function(req, res) {
      return global.resumable.post(req, function(status, filename, original_filename, identifier) {
        return res.send(status);
      });
    });
  };

}).call(this);
