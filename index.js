var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function(request, respons) {
	respons.sendFile(__dirname + '/index.html');
});

connections = [];

io.sockets.on('connection', function(socket) {
	console.log("Успешное соединение");
	// Добавление нового соединения в массив
	connections.push(socket);

	// Функция, которая срабатывает при отключении от сервера
	socket.on('disconnect', function(data) {
		connections.splice(connections.indexOf(socket), 1);
		console.log("Отключились");
	});

	// Функция получающая сообщение от какого-либо пользователя
	socket.on('send mess', function(data) {
		io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
	});
});