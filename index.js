//Crafty.init(900, 800, document.getElementById('game'));
//Crafty.viewport.clampToEntities = false;
//Crafty.enterScene('Play');

/*var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/

//var express = require('express');
//var app = express();

/*var http = require('http');

http.createServer(function (request, response)
{
	response.writeHead(200, {'Content-Type': 'test/plain'});
	response.write('Hello World');
	response.end();
	}).listen(8888);*/

var express = require('express');
var app = express();
var path = require('path');

//app.set('port', 5454);
app.use(express.static(path.join(__dirname, 'public')));

//listen for requests
//var server = app.listen(app.get('port'), function() {
//	var port = server.address().port;
//	console.log('Connected to port ' + port);

var server = app.listen(process.env.PORT || 3000, function(){
	console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
