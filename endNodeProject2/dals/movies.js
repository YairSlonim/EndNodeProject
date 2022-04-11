let axios = require('axios')

exports.getUsersFromWS =async function()
{
   return axios.get("http://localhost:8000/api/members")
}

exports.getMoviesFromWS =async function()
{
   return axios.get("http://localhost:8000/api/movies")
}

exports.getMovie = function(id)
{
   return axios.get(`http://localhost:8000/api/movies/${id}`)
}

exports.getNewMovie =async function(obj,genres)
{
    let res =  await axios.post("http://localhost:8000/api/movies/addMovie",{obj:obj,genres:genres})
    //console.log(res.data);
    return res
}

exports.getMovieByName =async function(name)
{
    let res =  await axios.post("http://localhost:8000/api/movies/getMovieByName",{name: name})
    return res.data._id;
}

exports.updateMovie =async function(id,obj,genres)
{
   
    let res =  await axios.post(`http://localhost:8000/api/movies/updateMovie/${id}`,{id:id,obj:obj,genres:genres})
    
    return res.data
}

exports.deleteMovie = async function(id)
{
     await axios.delete(`http://localhost:8000/api/movies/${id}`)
}
