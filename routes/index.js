
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.station = function(req, res){
  res.render('index', { station : req.params.id });
};