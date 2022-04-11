var express = require('express');
var router = express.Router();
const model = require("../models/users")

/* GET users listing. */
router.get('/',async function(req, res, next) {
  let result = await model.getAllUsersData();
  
  res.render("users",{data: result})
});


router.get('/usersManagment', function(req, res, next) {
  res.redirect("/users/ManageUsers");
});

router.get('/ManageUsers', function(req, res, next) {
  res.render("usersManagment",{});
});



router.get("/user/:username", async function(req, res, next){
  let arr = 
  [
   'View Subscriptions',
   'Create Subscriptions',
   'Delete Subscriptions',
   'Update Subscriptions',
   'View Movies',
   'Create Movies',
   'Delete Movies',
   'Update Movies'
 ]
 let index = 1;
  let user = await model.getUser(req.params.username)
  res.render("addOrUpdateUser",{data:user,arr,index})
  })


router.post("/addNewUser/:id?", async function(req, res, next){
  let resp = req.params.id
  console.log(req.params.id)
  if(resp){
    
    let result = await model.updateUser(req.body,req.params.id)
  }
  else{
    let result = await model.addUser(req.body);
  }

  res.redirect("/users")
})

router.get("/add", function(req, res, next){
  //let result = await model.getAllUsersData();
  
  let arr = 
  [
   'View Subscriptions',
   'Create Subscriptions',
   'Delete Subscriptions',
   'Update Subscriptions',
   'View Movies',
   'Create Movies',
   'Delete Movies',
   'Update Movies'
 ]
 let index = 0;
  res.render("addOrUpdateUser",{data:{},arr,index})
})

router.get('/delete/:id',async function(req, res, next) {
  let result = await model.deleteUser(req.params.id);
  if(result){
    console.log(req.params)
  res.redirect("/users");
  }
  else{
    res.send("sorry")
  }
  
});

module.exports = router;
