const moviesDal = require("../dals/movies");
const subscriptionsDal = require("../dals/subscriptions");

exports.getMovies =async function()
{
    let sub_details = await subscriptionsDal.getAllSub();
    let resp = await moviesDal.getMoviesFromWS()
    let data = resp.data
    let data2 = data.map((x) =>{
        return {...x,date:new Date(x.Premiered).getFullYear()}
    })
    
     await Promise.all (data2.map(async movie =>{
         Object.assign(movie,{subscribe:[]})

        
        await Promise.all (sub_details.data.map( async x =>{
         let data = x.Movies.map(sub =>sub.movieId)
            if(data.includes(movie._id)){
                let getMembersName = await subscriptionsDal.getMember(x.MemberId)
                let data = x.Movies.filter( m => m.movieId === movie._id) 

                let obj = { 
                    Name : getMembersName.data.Name,
                    date: new Date(data[0].data).getFullYear(),
                    memberId: x.MemberId,
                    subId : x._id
               }
                
                movie.subscribe.push(obj)
            }
        }))
   }))
    return data2;
    
}

exports.addMovie = async function(obj, genres)
{
    
    let result = await moviesDal.getNewMovie(obj, genres)
    if(result){
        return "addedTheNewMovie";
    }
    else{
        return ;
    }
    
}

exports.getMovie = function(id)
{
    
    return  moviesDal.getMovie(id)
    
    
}

exports.getMovieByName = async function(name)
{
    
    let result = await moviesDal.getMovieByName(name)
    
    return result;
}

exports.updateMovie = async function(id,obj, genres)
{
    
    let result = await moviesDal.updateMovie(id,obj, genres)
    if(result){
        return "updateTheMovie";
    }
    else{
        return ;
    }
    
}

exports.deleteMovie = async function(id)
{
    let result = await moviesDal.deleteMovie(id)
    
    
}