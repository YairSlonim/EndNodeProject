var express = require('express');
var router = express.Router();
const model = require("../models/movies")
const subModel = require("../models/subscriptions")

/* GET users listing. */
router.get('/',async function(req, res, next) {
  if(!req.session.auth){
     
    res.redirect('/')
   }
   
   if(req.session.permissions[0].permission.includes("View Movies")){
    let resp =await model.getMovies();
    res.render("allMovies",{data:resp})
   }
   else{
     res.redirect('/main')
   }
   
   
});



router.get('/moviesManagment',async function(req, res, next) {
  
  
  res.render("movies",{admin: req.session.admin})
});

router.get('/find',async function(req, res, next) {
  let resp =await model.getMovies();
  let result = resp.filter(movie =>{
    if(movie.Name.includes(req.query.name))
    return movie
  })
  if(result.length>0){
    res.render("allMovies",{data:result})
  }
  else{
    res.send("Sorry, we did not find a movie that contain your search")
  }
  
});

router.get("/add", function(req, res, next){
  
  if(req.session.permissions[0].permission.includes("Create Movies")){
    res.render("addOrUpdateMovie",{data:{}})
  }
  else{
    res.redirect('/main')
  }

  
})

router.post("/addNewMovie/:id?",async function(req, res, next) {
    let id = req.params.id;
    let resp ;
    let string = req.body.Genres;
	  string = string.substring(0,string.length)
	  let s = string.split(",")
    if(!id){
       resp = await model.addMovie(req.body,s)
    }
    else{
       resp = await model.updateMovie(id,req.body,s)
       console.log(resp);
    }
    if(resp == "addedTheNewMovie"){
      res.redirect("/movies")
    }
    if(resp == "updateTheMovie"){
      res.redirect("/movies")
    }
    else{
      res.send("failed")
    }
});

router.get("/movie/:id",async function(req, res, next){
  if(req.session.permissions[0].permission.includes("Create Movies")){
  try{
    let result = await model.getMovie(req.params.id)
    res.render("addOrUpdateMovie",{data:result.data})
  }
  catch(err){
    res.send(err)
  }
}
else{
  res.redirect('/main')
}
})

router.get('/search/:name',async function(req, res, next) {
  let resp =await model.getMovies();
  console.log(req.params.name)
   let movie = resp.filter(x => x.Name == req.params.name)
   
  
 res.render("allMovies",{data:movie})
});

router.get('/delete/:id',async function(req, res, next){

  if(req.session.permissions[0].permission.includes("Delete Movies")){
  //delete the movie from subscrie collection
  let data = JSON.parse(req.query.obj)
 
   data.subscribe.forEach(element =>{
    subModel.deleteInSub(element.subId, req.params.id)
    
  })
  //delete the movie from movies collection
  await model.deleteMovie(req.params.id);

  res.redirect("/movies")
}
else{
  res.redirect('/main')
}
})









module.exports = router;
