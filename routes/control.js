player_station = {};
var songNames = ["Help! - The Beatles", "Hypnotize - System of a Down", "The Immortals - Various Artists", "Storm - Craig Armstrong", "Mind Heist - Zack Hemsey"]

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
					
					console.info(radiostation.playing + ' ' + radiostation.count + ' '+  radiostation.ready);
					radiostation.playing = true;
					io.sockets.in(data.room_name).emit('players', { time: data.time, 
			play: true,
			stime: false });
			}
			else{
				console.info("no no");
			}
			},10000);
			
		}
		
	});
	
	socket.on("next song", function(data){
		var radiostation = player_station[data.room_name];
		
		console.info("reset ");
		if (radiostation && radiostation.playing){
			radiostation.ready = 0;
			radiostation.playing = false;
			var next = Math.floor(Math.random() * 4);
			io.sockets.in(data.room_name).emit('change song', {new_song: next, name: songNames[next] });
		}
	
	});
}
