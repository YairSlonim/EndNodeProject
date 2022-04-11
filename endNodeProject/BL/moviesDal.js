const axios = require("axios")
const Movie = require('../models/moviesModel')

exports.getMovies = async function()
{
    let resp =  await axios.get("https://api.tvmaze.com/shows")
    let data = resp.data
    let data2 = data.map(y =>{
        return {Name: y.name, Genres: y.genres, Image: y.image.medium, Premiered:y.premiered}
    });
    

    return new Promise((resolve,reject) =>
    {
        data2.forEach(item =>{
            const p = new Movie({
                Name : item.Name,
                Genres : item.Genres,
                Image : item.Image,
                Premiered: item.Premiered
                
            });
            console.log(p.Premiered);
            
            p.save(function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('updated')
                }
            })
            
        })
        })  
        
           
}


exports.getAllMovies = function()
{
    return new Promise((resolve,reject) => 
        {
            Movie.find({}, function(err,pers)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(pers)
        }
    })
        })
}

exports.addMovie = function(obj, genres)
{
    return new Promise((resolve,reject) =>
    {
        const p = new Movie({
            Name : obj.Name,
            Genres : genres,
            Image  : obj.Image,
            Premiered : obj.date
        });
        p.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('updated')
            }
        })
    })
}

exports.getAllMovies = function()
{
    return new Promise((resolve,reject) => 
        {
            Movie.find({}, function(err,pers)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(pers)
        }
    })
        })
}
exports.getMovie = function(id)
{
    
            Movie.findById(id, function(err,pers)
    {
        if(err)
        {
            return err
        }
        else
        {
            return pers
        }
    })
        
}

exports.getMovieByName = function(name)
{
    
    return new Promise((resolve,reject) => 
        {
            Movie.findOne({Name: name}, function(err,pers)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(pers)
        }
    })
        })
}

exports.updateMovie = function(id, obj, genres)
{
    
    return new Promise((resolve, reject) =>
    {
        Movie.findByIdAndUpdate(id,
            {
                Name : obj.Name,
                Genres : genres,
                Image : obj.Image,
                Premiered: obj.date
            }, function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('update')
            }
        })
    })
}

exports.deleteMovie = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Movie.findByIdAndDelete(id,
        function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('deleted')
            }
        })
    })
}
//this.getMovies()