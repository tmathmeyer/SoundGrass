"use strict";

var info = 0;
var songnum = 0;
var socket;
var latency;
//if (typeof AudioContext != 'undefined'){
//    var ctx = new AudioContext();
//} else {
//    var ctx = new webkitAudioContext();
//}

var offset// anl, volum= ctx.createGain();
var tmp = 0;
var can;


function playable()
{
	info++;
	if (info > 1)
	{
		socket.emit('players', {ready: true,
								room_name: location.pathname});

     /*    ;
		 anl = ctx.createAnalyser();
		var src = ctx.createMediaElementSource(audio);
		src.connect(volum);
		volum.connect(anl);
		anl.connect(ctx.destination);
		var data = new Uint8Array(anl.frequencyBinCount);
		can.width = window.innerWidth;
		can.height = window.innerHeight;
		window.xx = can.getContext("2d");
		var lg = xx.createLinearGradient(0,window.innerHeight - 255,0,2550);
		lg.addColorStop(0, "#157");
		lg.addColorStop(1, "white");
		xx.fillStyle = lg;

		window.ii = setInterval(function(){anl.getByteFrequencyData(data); xx.clearRect(0,0,window.innerWidth,window.innerHeight);for(var x in data){ xx.fillRect(x,window.innerHeight - data[x], 1, data[x])}}, 10) */
	}
}

function updatethetime()
{
	var progress = document.querySelector("progress");

	tmp = audio.currentTime / audio.duration * 100;

	if (!isNaN(tmp)){ // NaN
		progress.value = tmp;
	}

}

function songended()
{
	socket.emit('next song', {room_name: location.pathname});

}

function changesong(data)
{
	songnum++;
	var songloc = '/file' + data.new_song;
	audio.children[0].src = songloc + ".wav";
	document.getElementById("song-title").innerHTML = data.name;
	info = 1;
	window.audio = audio;

	audio.load();
}

function playClick()
{
	document.getElementById("play").style.display = "none";
	document.getElementById("pause").style.display = "";
	audio.volume = 1;
}

function pauseClick()
{
	document.getElementById("play").style.display = "";
	document.getElementById("pause").style.display = "none";
	audio.volume = 0;
}

function syncTime() {
    // Set up our time object, synced by the HTTP DATE header
    // Fetch the page over JS to get just the headers
    console.log("syncing time")
    var r = new XMLHttpRequest();
    var start = (new Date).getTime();

    r.open('HEAD', document.location, false);
    r.onreadystatechange = function()
    {
        if (r.readyState != 4)
            return;
	if(!latency)
	        latency = ((new Date).getTime() - start)/2;
	else
		latency = (((new Date).getTime() - start)/2)*0.75 + 0.25*latency;
        var timestring = r.getResponseHeader("DATE");

        // Set the time to the **slightly old** date sent from the
        // server, then adjust it to a good estimate of what the
        // server time is **right now**.
    };
    r.send(null);
//    setTimeout(function() {     alert((new Date()).getHours() + ":" + (new Date()).getMinutes() + ":" + (new Date()).getSeconds());}, (20 - systemtime.getHours())*3600000 + (17 - systemtime.getMinutes()) * 60000 - systemtime.getSeconds()* 1000 - systemtime.getMilliseconds());
}

window.addEventListener("DOMContentLoaded", function(){
	can = document.getElementById("can");
	var audio = document.querySelector("audio");
	// testing
	window.audio = audio;
	
	audio.load();

	audio.addEventListener("canplay", playable, true);
	audio.addEventListener("timeupdate", updatethetime, true);
	audio.addEventListener("ended",songended, true);

	socket = io.connect(location.origin);

	socket.on('connect', function () {
		socket.emit('player join room', {'room_name': location.pathname});
		audio.play();
		audio.pause();
		playable();
	});

	socket.on('change song', changesong);

	socket.on('players', function (msg) {
		console.info("yay", msg);
		if (msg.time)
			audio.currentTime = msg.time;
		if(msg.stime){
			var stime = new Date(msg.stime);
			syncTime();
		}
		if(msg.play){
		setTimeout(function() { audio.play(); playClick(); }, 5000 - latency);
		}
		else if (ptime === false)
			pauseClick();
	});

	socket.on('get station names', function(data){
		console.log(data);
	});
	pauseClick();
	document.getElementById("play").addEventListener("click", playClick);
	document.getElementById("pause").addEventListener("click", pauseClick);
	document.addEventListener("keyup", function(e){

		if (e.keyCode == 32)
			{
				if (!audio.volume)
					playClick();
				else
					pauseClick();
			}
	});
});
