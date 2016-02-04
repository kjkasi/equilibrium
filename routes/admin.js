var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  console.log('path ' + express.path);
  res.render('admin', { user : req.user });
});

router.post('/', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

module.exports = router;