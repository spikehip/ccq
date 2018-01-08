var restify = require('restify');
var errs = require('restify-errors');
var shell = require('shelljs');

var server = restify.createServer();
server.get('/api/:key', function(req, res, next) {
  if ( /^[a-z_]+$/.test(req.params.key) ) {
    status=shell.exec('sshpass -p "ubnt" ssh ubnt@192.168.1.20 /usr/www/status.cgi | grep '+req.params.key+'=');
    if (status.stdout.length == 0) {
      return next(new errs.NotFoundError('not here!'));
    }
    var pattern = req.params.key+'=([^;]+);';
    var found = status.stdout.match(new RegExp(pattern));
    if ( found != null && found.length > 0 ) {
      var obj = {};
      obj[req.params.key] = found[1];
      res.header("Access-Control-Allow-Origin", "*");
      res.send(obj);
    }
    else { 
      return next(new errs.NotFoundError('not here!'));
    } 
  }
  else { 
    return next(new errs.NotFoundError('not here!'));
  }

  next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});


