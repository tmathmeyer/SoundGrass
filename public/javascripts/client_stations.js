MockData = {
	'stationName':'name1'
	'stationData':{
		"owner":"john",
		"playlist":[]
	}
}


exports.handle = function(socket){
	socket.emit('create station', MockData);
	socket.emit('get stations');
	
	socket.on('get stations', function(data){
		if (data[0]){
			socket.emit('create station', MockData);
		} else {
			socket.emit('sucesss', {"success_in":"retrieving stations"});
		}
	});



}
