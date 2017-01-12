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