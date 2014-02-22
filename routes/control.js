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
		var radiostation = player_station[data.room_name];
	
		if (radiostation){
			radiostation.ready++;
			
			setTimeout(function(){
				if (!radiostation.playing &&
					radiostation.count == radiostation.ready){
	
					radiostation.playing = true;
					io.sockets.in(data.room_name).emit('players', { time: data.time, 
																	play: new Date(),
																	stime: new Date() });
				}
			},30000);
			
		}
		
	});
	
	socket.on("next song", function(data){
		var radiostation = player_station[data.room_name];
	
		if (radiostation && radiostation.playing){
			radiostation.ready = 0;
			radiostation.playing = false;
		}
	
	});
}
