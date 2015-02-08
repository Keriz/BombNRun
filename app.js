var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));

server.listen(8000);

io.on('connection', function(socket){
	socket.emit('bonjour');
});