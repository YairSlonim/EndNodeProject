const express = require('express')

const router = express.Router();

const moviesBL = require('../BL/moviesDal')

const Movie = require('../models/moviesModel')

router.route('/').get(async function(req,resp)
{
    let result = await moviesBL.getAllMovies()
    return resp.json(result)
})

router.route('/addMovie').post(async function(req,resp)
{
    let result = await moviesBL.addMovie(req.body.obj,req.body.genres)

    if(!result)
    {
        return "fail"
    }
    else{
        return resp.json(result)
    }
})

router.route('/getMovieByName').post(async function(req,resp)
{
    let result = await moviesBL.getMovieByName(req.body.name)
    if(!result)
    {
        return "fail"
    }
    else{
        return resp.json(result)
    }
})

router.route('/:id').
    get(function(req,resp)
    {
        Movie.findById(req.params.id, function(err,movies)
        {
            if(err)
            {
                return resp.send(err)
            }
            return resp.json(movies)
        })       
    });

router.route('/updateMovie/:id').post(async function(req,resp)
{
    
    let result = await moviesBL.updateMovie(req.params.id,req.body.obj,req.body.genres)

    if(!result)
    {
        return "fail"
    }
    else{
        return resp.json(result)
    }
})

router.route('/:id')
    .delete( async function(req,resp)
    {
        let id = req.params.id
        moviesBL.deleteMovie(id)
        return resp.json("deleted")
    });

module.exports = router;
    