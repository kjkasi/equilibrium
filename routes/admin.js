var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('./../models/account');

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

  Account.find({}, function(err, users) {
    if (err) throw err;
    //console.log(users);
    res.render('admin-accounts', { users : users });
  });

  //res.render('admin-accounts', { accounts : query });
});

router.post('/accounts', function(req, res) {

  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/admin/accounts');
        });
    });
});

router.delete('/accounts', function(req, res) {

  console.log("DELEtE /admin/accounts");

  res.redirect('/');
});

module.exports = router;