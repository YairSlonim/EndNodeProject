var express = require('express');
var router = express.Router();
const model = require("../models/subscriptions")

/* GET home page. */
router.get('/',async function(req, res, next) {
  if(!req.session.auth){
     
    res.redirect('/')
   }
  res.render('subscriptions', { title: 'Movies-Subscriptions Web Site', admin:req.session.admin });
});

router.get('/allMembers',async function(req, res, next) {
  if(req.session.permissions[0].permission.includes("View Subscriptions")){
  let check = await model.getMembers()
  
  //let result = await model.getAllMembers();
  //let result2 = await model.getMembersSub();
  let movies = await model.getMoviesNames();
  
  res.render('allMembers', {data: check, movies: movies });
  }
  else{
    res.redirect('/main')
  }
});

router.get("/add", function(req, res, next){
  //let result = await model.getAllUsersData();
  if(req.session.permissions[0].permission.includes("Create Subscriptions")){
    res.render("AddOrUpdateMember",{data:{}})
  }
  else{
    res.redirect('/main')
  }
  
})

router.get("/member/:id",async function(req, res, next){
  if(req.session.permissions[0].permission.includes("Update Subscriptions")){
  try{
    let result = await model.getMember(req.params.id)
    res.render("AddOrUpdateMember",{data:result})
  }
  catch(err){
    res.send(err)
  }
}
else{
  res.redirect('/main')
}
})

router.post("/AddOrUpdateMember/:id?", async function(req, res, next){
  let id = req.params.id;
  let resp;
  if(!id)
  {
    resp = await model.addMember(req.body);
    if(!resp){
      
    }
    else{
      res.redirect("/subscriptions/allMembers")
    }
  }
  else{
    resp = await model.updateMember(id,req.body);
    if(!resp){
      res.send(err)
    }
    else{
      res.redirect("/subscriptions/allMembers")
    }
  }
  
})

router.post("/addNewSub/:id",async function(req, res, next) {
  
  try{  
    let result = await model.addSub(req.params.id,req.body.date, req.body.movieName)
    res.redirect("/subscriptions")
  }catch(err){
    res.send(err)
  }
  
});

router.get("/delete/:id",async function(req, res, next){
  if(req.session.permissions[0].permission.includes("Delete Subscriptions")){

  let result = await model.deleteMember(req.params.id);
  if(result){
   await model.deleteMemberInSub(req.params.id)
   res.redirect("/subscriptions/allMembers")
  }
  else{
    res.send("error")
  }
}
else
{
  res.redirect('/main')
}
})


module.exports = router;
