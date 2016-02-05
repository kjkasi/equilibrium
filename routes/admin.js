var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.render('admin', { user : req.user });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/admin-index');
});

router.get('/index', function(req, res) {
  res.render('admin-index', { user : req.user });
});

module.exports = router;