const { now } = require("mongoose");
const subscriptionsDal = require("../dals/subscriptions");
const model = require("../models/movies")

  exports.getMembers = async ()=>
{
  //get subscriptions 
  let subscriptions = await subscriptionsDal.getAllSub();

  let members =await Promise.all (subscriptions.data.map(async x => {
  
  let data_member = await subscriptionsDal.getMember(x.MemberId)
    //member details 
    
  let date_movie  = await Promise.all (x.Movies.map(async x =>{
                    let data = await model.getMovie(x.movieId)
                    if(data.data === null){
                        console.log(x.movieId)
                    }
                    return  {Name : data.data.Name,id:x.movieId, date: x.data}}))
    //movie details                
      return Object.assign(data_member.data,{movies:date_movie},{_ids:x._id})
    }))

    return members;                
  }   

exports.getAllMembers =async function()
{
    let resp = await subscriptionsDal.getAllMembers()
    let data = resp.data
    return data;
    
}

exports.getMember = async function(id)
{
    let resp = await subscriptionsDal.getMember(id)
    let data = resp.data
    return data;
}
exports.getMembersSub = async function()
{
    //let movies = await model.getMovies();
    let resp = await subscriptionsDal.getAllSub()
    let members = await this.getAllMembers()
    let sub = resp.data
    
    
    
    
    let result = members.map(item => {
        const obj = sub.find(o => o.MemberId === item._id);
        return {...obj, ...item };
      });
      
      //console.log(result);
      return result;

      /*
      for(let i = 0 ; i<result.length; i++){
          for(let j = 0; j<result[i].movies[j]; j++){
              if(movies._id.includes(result[i].movies[j])){
                  result[i] = {...result[i],movieName: movies.Name}
              }
          }
      }
      console.log(result);
      */
      //console.log(result.filter(x => x.Movies));
      /*
      const resultWithMovieName = result.map(item =>{
         // item.movies
           const obj = movies.find(o => o._id === item.movieId);     //console.log(item.Movies[0]._id)
         return {...item,...obj  }
      });
      console.log(resultWithMovieName);
      console.log("========================");

    return result;
    */
    }

exports.getMoviesNames = async function()
{
    let resp = await model.getMovies();
    //let moviesNames = resp.map(movie =>{return movie.Name})
    let data2 = resp.map((x) =>{
        return {...x,date:new Date(x.Premiered).toISOString().slice(0,10)}
    })
    
    return data2;
}

exports.addSub = async function(id,date,name)
{
    let result;
    let MovieId = await model.getMovieByName(name);
    let allSubs = await subscriptionsDal.getAllSub()
    let allMembersId = allSubs.data.map(sub =>{return sub.MemberId})
    //console.log(allMembersId);
    let check = allMembersId.filter(x =>{
        if(x == id){
            return x + " is equal to " + id
        }
    })
    if(check.length > 0){
         result = await subscriptionsDal.addMovieToSub(id,date, MovieId);
    }
    else{
        result = await subscriptionsDal.addSub(id,date, MovieId);
    }
     
    return result 
}
exports.updateMember = async(id,obj) =>
{
    let resp = await subscriptionsDal.updateMember(id,obj);
    return resp;
}

exports.addMember = async(obj) =>
{
    let result = await subscriptionsDal.addMember(obj);

    if(result.data == "created!")
    {
        let member = await subscriptionsDal.getMemberByName(obj.Name)
        
        let result2 = await subscriptionsDal.addNewSubscription(member.data._id)
        return result
    }else{
        console.log("failed")
    }
}

exports.deleteInSub = async(subId, movieId) =>
{
    let sub = await subscriptionsDal.getSubById(subId);
    let newMoviesArr = sub.data.Movies.filter(x=>{
         if(x.movieId !== movieId)
         return x
    })
    sub.data.Movies = newMoviesArr
    
    let result = await subscriptionsDal.deleteMovieInSub(subId, newMoviesArr)
}

exports.deleteMember = async(id) =>
{
    let result = await subscriptionsDal.deleteMember(id)
    return result;
}

exports.deleteMemberInSub = async(id) =>
{
    let result = await subscriptionsDal.deleteMemberInSub(id);
}
