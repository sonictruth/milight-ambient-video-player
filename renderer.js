var ColorThief = require('./color-thief.js');
var mb = require('milight_v6');
var z1 = mb.zoneCtlRGBWFactory(0x01);
var colorThief = new ColorThief();
var video = document.getElementById("vid");
var intervalID;

mb.initiate('127.0.0.1', 5987);
// video.style.display = 'none';

video.addEventListener("play", function() {
	mb.sendCmd(z1.on());
	video.width = video.videoWidth;
	video.height = video.videoHeight;
	var setColor = function() {
		clearTimeout(intervalID);
		var f = colorThief.getColor(video);
		mb.sendCmd(z1.colorRGB(f));
		document.body.style.backgroundColor = 'rgb(' + f.join(',') + ')';
		intervalID = setTimeout(setColor, 50);
	};
	setColor();
});

setTimeout(function(){
	video.play();
},1000);

video.addEventListener("pause", function() {
	clearTimeout(intervalID);
});