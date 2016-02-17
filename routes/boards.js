var express = require('express');
var router = express.Router();
var passport = require('passport');
var Board = require('./../models/board');

router.get('/boards', function(req, res) {

  Board.find({}, function(err, boards) {
    if (err) throw err;
    res.render('admin-boards', { "boards" : boards });
  });
});

router.post('/boards', function(req, res) {

  var board = new Board ({
        title: req.body.title,
        partn: req.body.partn,
    });

  board.save(function(err){
    if (err) throw err;

    Board.find({}, function(err, boards) {
      if (err) throw err;
        res.render('admin-boards', { "boards" : boards });
      });
  });
});

router.post('/boards/:id/delete', function(req, res) {

  Board.find({}, function(err, boards) {
    if (err) throw err;
    res.render('admin-boards', { "boards" : boards });
  });
});


module.exports = router;