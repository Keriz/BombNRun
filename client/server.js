io = require('socket.io-client');
var socket = io.connect(null);

module.exports = {socket: socket};