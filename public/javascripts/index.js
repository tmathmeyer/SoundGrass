"use strict";

var info = 0;
var socket;

function playable()
{
	info++;
	if (info > 1)
		socket.emit('players', {ready: true});
}

window.addEventListener("DOMContentLoaded", function(){
	var audio = document.querySelector("audio");
	// testing
	window.audio = audio;
	audio.addEventListener("canplaythrough", playable);
	socket = io.connect(location.href);
	socket.on('connect', function () {
		playable();

		socket.on('message', function (msg) {
			console.info("yay", msg);
		});
	});
});
