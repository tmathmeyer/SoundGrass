stations = [];

load_stations = function(){
	stations = ["abra", "absynth", "abacus", "abacore", "abstinance", "azeroth", "station1", "alsa", "pulseaudio", "fuck", "flubber", "slock", "slinkies"];
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
		table+="<li onclick='joinStation(\""+data+"\")'>"+data+"</li>";
	});
	table+="</ul>";
	document.getElementById('table').innerHTML = table;
}

clear_dropdown = function(){
	document.getElementById("inpute").placeholder = "";
	filter_stations();
}