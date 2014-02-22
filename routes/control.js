player_station = {};



exports.handle = function(socket, io){
	socket.on("player join room", function(data){
		socket.join(data.room_name);
		if (player_station[data.room_name]){
			player_station[data.room_name].count++;
		}else{
			player_station[data.room_name] = {'count' : 1,
										  	  'ready' : 0,
										  	  'playing' : false};
		}
	});
	
	socket.on("players", function(data) {
		if (player_station[data.room_name]){
			player_station[data.room_name].ready++;
			
			if (!player_station[data.room_name].playing &&
				player_station[data.room_name].count == player_station[data.room_name].ready){
				
				player_station[data.room_name].playing = true;
				io.sockets.in(data.room_name).emit('players', { time: data.time, 
																play: true,
															 	stime: new Date() });
			}
		}
		
	});
}
