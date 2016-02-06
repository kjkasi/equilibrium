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

//need authorization verify
router.post('/accounts', function(req, res) {

  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {

          Account.find({}, function(err, users) {
            if (err) throw err;
            //console.log(users);
            res.render('admin-accounts', { users : users, info: "Sorry. That username already exists. Try again." });
          });

        } else {

          passport.authenticate('local')(req, res, function () {
            res.redirect('/admin/accounts');
          });
        }
    });
});

//need authorization verify
router.post('/accounts/:id/delete', function(req, res) {

  Account.findOne({"_id" : req.params.id}, function(err, user) {
    //if (err) throw err;
    if (err) {
      res.sendStatus(404);
    } else {
      res.json({user});
    }
  });

  //res.redirect('/');
});

module.exports = router;