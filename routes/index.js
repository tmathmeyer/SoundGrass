
/*
 * GET home page.
 */

var names = ["Help! - The Beatles", "Hypnotize - System of a Down", "The Immortals - Various Artists", "Storm - Craig Armstrong", "Mind Heist - Zack Hemsey"]

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.station = function(req, res){
  res.render('index', { station : req.params.id, audiofile : "/file1.wav", songname: names[1] });
};
