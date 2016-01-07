var express = require('express');
require('../db');
var router = express.Router();

/* GET users listing. */
function md5(val){
  return require('crypto').createHash('md5').update(val).digest('hex');
}
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/reg',function(req,res){
  res.render('user/reg',{title:'注册'});
})
router.post('/reg',function(req,res){
var user=req.body;
  console.log(user);
  if(user.password != user.repassword ){
    return res.redirect('/users/reg');
  }
  delete  user.repassword;
  user.password=md5(user.password);
  new Model('User')(user).save(function(err,user){

    if(err){
      return res.redirect('/users/reg');
    }else{
      res.redirect('/users/login');
    }
  });
})
router.get('/login',function(req,res){
  res.render('user/log',{})
})
router.post('/login',function(req,res){
var user=req.body;
  user.password=md5(user.password);
  Model('User').findOne(user, function(err,user){
    if(user){
      res.redirect('/');
      req.session.user=user;
      console.log("findOne-session---"+req.session.user)
    }else{
      res.redirect('/users/login');
    }
  })
})
router.post('/logout',function(req,res){
  req.session.user=null;
})

module.exports = router;
