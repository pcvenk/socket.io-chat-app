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


//Connect to Socket
io.sockets.on('connection', function(socket){
   //Set UserName
   socket.on('set user', function(data, cb){
      //if the user exists, send the error message(User already exists)
      if(users.indexOf(data) != -1){
         cb(false)
      } else {
         cb(true);
         socket.username = data;
         users.push(socket.username);
         updateUsers();
      }
   });

   function updateUsers(){
      io.sockets.emit('users', users);
   }

   socket.on('disconnect', function(data){
      socket.username = data;
      if(!socket.username) return;
      users.splice(users.indexOf(socket.username), 1);
      updateUsers();
   })
});

//Index Route
app.get('/', function(req, res){
   res.render('index');

});

server.listen(3000);
console.log('Server listening on port 3000');