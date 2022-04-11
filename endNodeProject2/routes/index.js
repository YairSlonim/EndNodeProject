var express = require('express');
var router = express.Router();
const model = require("../models/login")

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('login', { title: 'Movies-Subscriptions Web Site' });
});

router.post('/getlogindata',async function(req, res, next) {
   let userLogin =  {username: req.body.username, password: req.body.password}
    let result = await model.checkValid(userLogin)
    let user = result[0]
    let permissions = result[1]
    if(result){
    if(user[0].FirstName =="Admin"){
        req.session.auth = true;
        req.session.admin = true;
        req.session.permissions = permissions;
        res.render("main",{admin:req.session.admin });
      }
      else{
        req.session.auth = true;
        req.session.admin = false;
        req.session.permissions = permissions;
        
        req.session.cookie.maxAge = parseInt(user[0].SessionTimeOut)* 600000
        res.render("main",{admin:req.session.admin });
      }
    }
    else{
      res.send("wrong username/password")
    }
  
});

router.get("/createAccount", function(req, res, next) {
  res.render("createAccount",{title: 'Movies-Subscriptions Web Site'});

});

router.post("/getUserNameCreate",async function(req, res, next) {
  let userData =  {username: req.body.username, password: req.body.password}
  let result = await model.checkUserNameAndCreate(userData)
  if(!result){
    res.send("user doesn't exist")
  }
  else{
    res.redirect('/')
  }

});

router.get("/main", function(req, res, next) {
  res.render("main",{admin: req.session.admin});

});

router.get("/mainAdmin", function(req, res, next) {
  res.render("main",{admin: req.session.admin});

});

router.get("/Mainmovies", function(req, res, next) {
  res.redirect("/Movies");
});


router.get("/backToMain", function(req, res, next) {
  res.render('main', {admin: req.session.admin})

});


module.exports = router;
