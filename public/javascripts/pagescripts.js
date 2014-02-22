stations = [];

load_stations = function(socket){
	//stations = ["abra", "absynth", "abacus", "abacore", "abstinance", "azeroth", "station1", "alsa", "pulseaudio", "fuck", "flubber", "slock", "slinkies"];
	socket.emit('get station names', null);
	socket.on('get station names', function(data){
		console.log(data);
		stations = data;
	});
}

filter_stations = function(){
	text = document.getElementById("inpute").value;
	fun = stations.filter(function(data){
		return data.indexOf(text.toLowerCase()) == 0;
	});
	render_grid(fun);
}

render_grid = function(stations){
	table = "<ul id='searche'>";
	stations.forEach(function(data){
		table+="<li name='"+data+"' class='selectionList'>"+data+"</li>";
	});
	table+="</ul>";
	document.getElementById('table').innerHTML = table;
	nodes = Array.prototype.slice.call(document.getElementsByClassName('selectionList'));
	nodes.forEach(function(each){
		each.addEventListener("touchstart", joinStation, false);
		each.addEventListener("click", joinStation, false);
	});
}

clear_dropdown = function(){
	filter_stations();
}
