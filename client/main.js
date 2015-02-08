var server = require('./server');
var socket = server.socket;

socket.on('bonjour', function(){
	alert("bonjour a ete recu !");
});


console.log('ça marche pas! teste');