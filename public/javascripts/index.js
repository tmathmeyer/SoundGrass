"use strict";

var info = 0;
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
        {
            return;
        }
        latency = ((new Date).getTime() - start)/2;
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
			offset = (stime.getHours())*3600000 + (stime.getMinutes()) * 60000 + stime.getSeconds()* 1000 + stime.getMilliseconds() + latency*3 - ((new Date()).getHours()*3600000 + (new Date()).getMinutes()*60000 + (new Date()).getSeconds()*1000 + (new Date()).getMilliseconds());
//			offset = stime.getMilliseconds() + latency*3 - (new Date()).getMilliseconds();
		//	alert("Latency: " + latency + ", offset: " + offset);
		console.log(offset);
		}
		if(msg.play){
			var ptime = new Date(msg.play);
			setTimeout(function() {playClick(); audio.play(); }, ptime.getHours()*3600000 + ptime.getMinutes()*60000 + ptime.getSeconds()*1000 + ptime.getMilliseconds() - ((new Date()).getHours()*3600000 + (new Date()).getMinutes()*60000 + (new Date()).getSeconds()*1000 + (new Date()).getMilliseconds()) + offset + 5000);
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
});
