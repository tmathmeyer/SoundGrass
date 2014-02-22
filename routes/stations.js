stations = {
    "test1" : {
        "owner":"ted",
        "count": 0,
        "playlist" : [
            "song1",
            "song2",
            "song3",
            "song4"
        ]
    }
};

MockData = {
	'stationName':'name1',
	'stationData':{
		"owner":"john",
		"count":0,
		"playlist":[]
	}
}

clear_stations = function(){
	delete stations;
	stations = {
		"Default" : {
			"owner":"Overlord",
			"count":0,
			"playlist":[]
		}
	};
	socket.emit('delete success', {'success_in':'delete all'});
}

remove_station = function(data){
	var stationName = data.stationName.toLowerCase();

	if (stations[stationName]){
		delete stations[stationName];
		socket.emit('delete success', {'success_in':'delete specified'});
	}else{
		socket.emit('delete failure', {'fail_in':'no station found'});
	}

}




exports.handle = function(socket, io){

	socket.on('get stations', function(){
		socket.emit('get stations', stations);
	});
	
	socket.on('get station names', function(){
		socket.emit('get station names', Object.keys(stations));
	});

	socket.on('create station', function(data){
		var stationName = data.stationName.toLowerCase();
	
		if (stations[stationName]){
			socket.emit('error', {"error_in":"create station"});
		} else {
			stations[stationName] = data.stationData;
			socket.emit('success', {"success_in":"create station"});
		}
		
		
	});

	socket.on('add song to station', function(data){
		var stationName = data.stationName.toLowerCase();
		var songName = data.songName.toLowerCase();
		
		if (stations[stationName]){
			stations[stationName].playlist.push(songName);
			socket.emit('success', {"success_in":"add song to station"});
		} else {
			socket.emit('error', {"error_in":"add song to station"});
		}
	});
	
	socket.on('join station', function(data){
		var stationName = data.stationName.toLowerCase();
		if (stations[stationName]){
			stations[stationName].count++;
			socket.emit('join station', {'go_to':'station/'+stationName});
		}else{
			socket.emit('error', {'error_in':'joining station'});
		}
	
	});

}
