"use strict";

window.addEventListener("DOMContentLoaded", function(){
	var audio = document.querySelector("audio");
	// testing
	window.audio = audio;
	audio.addEventListener("canplaythrough", function(e){console.info("PLAYABLE", this, e)});
});
