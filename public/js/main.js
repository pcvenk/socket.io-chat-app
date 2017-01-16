var messages = [];
var socket = io.connect('http://localhost:3000');
var chatForm = $('#chatForm');
var message = $('#chatInput');
var chatWindow = $('#chatWindow');
var userForm = $('#userForm');
var username = $('#username');
var users = $('#users');
var error = $('#error');


//Submit User Form
userForm.submit(function(e){
    e.preventDefault();
    //set user on the server;user input;
    socket.emit('set user', username.val(), function(data){
        //if reg. user hide, the Create user form and show the textarea
        if(data){
            $('#userFormWrap').hide();
            $('#mainWrap').show();
        } else {
            //this will be shown on the server
            error.html('Username already taken!');
        }
    })
});

//Send Message
chatForm.submit(function(e){
    e.preventDefault();
    socket.emit('send message', message.val());
    //clear messages
    message.val('');
});

//Show Message
socket.on('show message', function(data){
   //Appending data to the well
   chatWindow.append('<strong>'+data.user+'</strong>: '+data.message+'<br>');
});

//Display Users
socket.on('users', function(data){
    var text = '';
    for(var i = 0; i < data.length; i++){
        text += '<li class="list-group-item userlist">'+data[i]+'</li>'
    }
    users.html(text);
});

