var restify = require('restify');
var errs = require('restify-errors');
var shell = require('shelljs');

var ubnt_user = process.env.UBNT_USER;
var ubnt_pass = process.env.UBNT_PASS;
var ubnt_host = process.env.UBNT_HOST; 

if ( ubnt_user === undefined ) {
  ubnt_user = "ubnt";
}
if ( ubnt_pass === undefined ) {
  ubnt_pass = "ubnt";
}
if ( ubnt_host === undefined ) {
  ubnt_host = "192.168.1.20";
}

var server = restify.createServer();
server.get('/api/:key', function(req, res, next) {
  if ( /^[a-z_]+$/.test(req.params.key) ) {
    status=shell.exec('sshpass -p "'+ubnt_pass+'" ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no '+ubnt_user+'@'+ubnt_host+' /usr/www/status.cgi | grep '+req.params.key+'=');
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


