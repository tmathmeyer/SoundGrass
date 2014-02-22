"use strict";

var info = 0;
var socket;

function playable()
{
	info++;
	if (info > 1)
		socket.emit('players', {ready: true,
								room_name: location.pathname});
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

window.addEventListener("DOMContentLoaded", function(){
	var audio = document.querySelector("audio");
	// testing
	window.audio = audio;
	audio.addEventListener("canplaythrough", playable);
	socket = io.connect(location.origin);

	socket.on('connect', function () {
		socket.emit('player join room', {'room_name': location.pathname});
		playable();
	});

	socket.on('players', function (msg) {
		console.info("yay", msg);
		if (msg.time)
			audio.currentTime = msg.time;
		if (msg.play)
			audio.play();
		else if (msg.play === false)
			audio.pause();
	});

	socket.on('get station names', function(data){
		console.log(data);
	});
	pauseClick();
	document.getElementById("play").addEventListener("click", playClick);
	document.getElementById("pause").addEventListener("click", pauseClick);
});
