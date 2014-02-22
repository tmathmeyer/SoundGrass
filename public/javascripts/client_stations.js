MockData = {
	'stationName':'name1',
	'stationData':{
		"owner":"john",
		"playlist":[]
	}
}

//socket = io.connect('http://localhost');
socket = {};

show_stations = function(){
	socket.emit('get stations');
	
	socket.on('get stations', function(data){
		document.getElementById("fuckers").html(JSON.stringify(data));
	});
}

add_station = function(){
	socket.emit('create station', {'stationName' : 'test_name', 'stationData' : {
									'owner' : 'test1',
									'playlist' : []
									}});
}
