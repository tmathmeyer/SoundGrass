exports.handle = function(socket, io){

	socket.on("players", function(data) {
		io.sockets.emit('players', { time: data.time, play: data.play, stime: new Date() });
	});
}
