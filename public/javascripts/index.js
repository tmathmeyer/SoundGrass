"use strict";

var info = 0;
var songnum = 0;
var socket;
var latency;
var offset;
function playable()
{
	info++;
	if (info > 1)
		socket.emit('players', {ready: true,
								room_name: location.pathname});
}

function updatethetime()
{
	var progress = document.querySelector("progress");
	progress.value = audio.currentTime / audio.duration * 100;
	
	if (progress.value == 100){
		
	}

}

function songended()
{
	songnum++;
	var songloc = '/file';//+songnum;
	audio.children[0].src = songloc + ".opus";
	audio.children[1].src = songloc + ".ogg";
	audio.children[2].src = songloc + ".mp3";
		
	socket.emit('next song', {room_name: location.pathname});
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
	var audio = document.querySelector("audio");
	// testing
	window.audio = audio;


	audio.addEventListener("canplaythrough", playable);
	audio.addEventListener("timeupdate", updatethetime);
	audio.addEventListener("ended",songended);
	
	socket = io.connect(location.origin);

	socket.on('connect', function () {
		socket.emit('player join room', {'room_name': location.pathname});
		playable();
	});

	socket.on('players', function (msg) {
		console.info("yay", msg);
		if (msg.time)
			audio.currentTime = msg.time;
		if(msg.stime){
			var stime = new Date(msg.stime);
			syncTime();
		}
		if(msg.play){
		latency += audio.currentSrc.endsWith("opus") ? 10 : 0;
		latency += audio.currentSrc.endsWith("mp3") ? 250 : 0;
		latency += audio.currentSrc.endsWith("ogg") ? 200 : 0;
		setTimeout(function() { audio.play(); playClick(); }, 5000 - latency);
		}
		else if (ptime === false)
			pauseClick();
	});

	socket.on('get station names', function(data){
		console.log(data);
	});
    clear_dropdown();
	pauseClick();
	document.getElementById("play").addEventListener("click", playClick);
	document.getElementById("pause").addEventListener("click", pauseClick);
});
