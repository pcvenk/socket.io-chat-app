var express = require('express'),
    app     = express(),
    path    = require('path'),
    server  = require('http').createServer(app),
    io      = require('socket.io').listen(server),
    users   = [];


//Set View Engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);

//Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

//Index Route
app.get('/', function(req, res){
   res.render('index');

});

server.listen(3000);
console.log('Server listening on port 3000');