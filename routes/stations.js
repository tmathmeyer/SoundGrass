stations = {
    "test1" : {
        "owner":"ted",
        "playlist" : [
            "song1",
            "song2",
            "song3",
            "song4"
        ]
    }
};

exports.createStation = function(req, res){

});

app.get('/stations/list', function(req, res){
    res.send(JSON.stringify(stations));
});

app.get('/stations', function(req, res){

});
    


exports.handle = function(socket){
	socket.on('get stations', function(data){
		socket.emit('get stations', stations);
	});

	socket.on('create station'. function(data){
		
	});



}