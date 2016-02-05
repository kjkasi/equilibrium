var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res) {
  res.render('admin-login', { user : req.user });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/admin/error'}), function(req, res) {
  res.redirect('/admin-index');
});

router.get('/error', function(req, res) {
  res.render('admin-error', {title : "equilibrium"});
});

//need authorization verify
router.get('/index', function(req, res) {
  //if (!req.user) {
    //res.redirect('/admin/error');
  //};
  res.render('admin-index', { user : req.user });
});

//need authorization verify
router.get('/accounts', function(req, res) {
  res.render('admin-accounts', { user : req.user });
});

module.exports = router;