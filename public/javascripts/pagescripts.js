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
	var rex = text.length > 0 ? new RegExp(Array.prototype.filter.call(text, function(x){return x.charCodeAt() >= 97 && x.charCodeAt() <= 122}).join(".*"), "i") : false;
	var fun;
	console.info(rex);
	if (!rex)
	{
		fun = stations.filter(function(){return true});
	}
	else
	{
		fun = stations.filter(function(data){return rex.test(data);});
	}
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

function clear_dropdown(){
	filter_stations();
}

	window.addEventListener("load", function(){clear_dropdown();});
