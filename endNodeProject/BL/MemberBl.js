const Member = require('../models/MemberModel')
const usersDal = require("./usersDal")

exports.getUsersOnes = async function()
{
    let resp =await usersDal.getUsers()
    let data = resp.data
    return new Promise((resolve,reject) =>
    {
        const p = new Member({
            Name : data.Name,
            Email : data.Email,
            City : data.City
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

exports.getMembers = function()
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

exports.getMember = function(id)
{
    
    return new Promise((resolve,reject) => 
        {
            Member.findById(id, function(err,per)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(per)
        }
    })
        })
}

exports.getMemberByName = function(name)
{
    return new Promise((resolve,reject) => 
        {
            Member.findOne({Name: name}, function(err,member)
    {
        if(err)
        {
            reject(err)
        }
        else
        {
            resolve(member)
        }
    })
        })
}

exports.addMember = function(obj)
{
    
    return new Promise((resolve,reject) =>
    {
        const p = new Member({
            Name : obj.Name,
            Email : obj.Email,
            City : obj.City
        });
        p.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(p)
            }
        })
    })
}

exports.updateMember = function(id,obj)
{
    return new Promise((resolve,reject) =>
    {
        Member.findByIdAndUpdate(id
        ,{
            Name : obj.Name,
            Email : obj.Email,
            City : obj.City
        },
        function(err)
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

exports.deleteMember = function(id)
{
    return new Promise((resolve,reject) =>
    {
        Member.findByIdAndDelete(id,
        function(err)
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