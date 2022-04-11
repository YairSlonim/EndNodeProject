const Member = require('../models/MemberModel')
const Subscription = require('../models/subscriptionsModel')

exports.getSubscriptions = function()
{
    return new Promise((resolve,reject) => 
        {
             Subscription.find({}, function(err,subs)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(subs)
        }
    })
        })
}

exports.getSubById = function(id)
{
    return new Promise((resolve,reject) => 
        {
            Subscription.findById(id, function(err,sub)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(sub)
        }
    })
        })
}


exports.getAllMembers = function()
{
    return new Promise((resolve,reject) => 
        {
            Member.find({}, function(err,pers)
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

exports.addSub = function(id)
{
    return new Promise((resolve,reject) =>
    {
        const p = new Subscription({
            MemberId : id,
            Movies :[]
            
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

exports.updateMoviesInSub = function(id, date, MovieId)
{
    let movie = {movieId: MovieId, data: date}
    return new Promise((resolve,reject) =>
    {
        Subscription.updateOne({MemberId: id},
            { $push: { Movies: movie }}, function(err)
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

exports.deleteMovieInSub = function(id, movieArr)
{
    //let movie = {movieId: MovieId, data: date}
    return new Promise((resolve,reject) =>
    {
        Subscription.findByIdAndUpdate(id,
            {  Movies: movieArr }, function(err)
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

exports.deleteMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Subscription.findOneAndDelete({MemberId:id},
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