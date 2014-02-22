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

MockData = {
	'stationName':'name1'
	'stationData':{
		"owner":"john",
		"playlist":[]
	}
}






exports.handle = function(socket){
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

	socket.on('add song to station', function(data){
		if (stations[data.stationName]){
			stations[data.stationName].playlist.push(data.songName);
			socket.emit('success', {"success_in":"add song to station"});
		} else {
			socket.emit('error', {"error_in":"add song to station"});
		}
	});

	socket.on("players", function(data) {
		// { ready: true }
	});

}
