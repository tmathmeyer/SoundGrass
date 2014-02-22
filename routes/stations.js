stations = {
    "test1" : {
        "owner":"ted",
        "playlist" : [
            "song1",
            "song2",
            "song3",
            "song4"
        ]
    }
};





exports.handle = function(socket, io){
	var ss = socket;

	socket.on('get stations', function(data){
		socket.emit('get stations', stations);
	});

	socket.on('create station', function(data){
		if (stations[data.stationName]){
			socket.emit('error', {"error_in":"create station"});
		} else {
			stations[data.stationName] = data.stationData;
			socket.emit('success', {"success_in":"create station"});
		}
	});

	socket.on("players", function(data) {
		// { ready: true }
		io.sockets.emit('players', { time: data.time, play: data.play });
	});

}
