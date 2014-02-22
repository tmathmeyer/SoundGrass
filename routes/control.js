exports.handle = function(socket, io){

	socket.on("players", function(data) {
		// { ready: true }
		io.sockets.emit('players', { time: data.time, play: data.play, stime: new Date() });
	});
}
