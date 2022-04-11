const usersDal = require("../dals/readFromUsers");
const permissionsDal = require("../dals/readFromPermissions")
const writeToPermission = require("../dals/writeIntoPermissions");
const User = require('../schema/usersSchema')
const writeToFile = require("../dals/writeIntoUsers")

//functions for show all users data
exports.getAllUsersData = async function()
{
    let dataFromDb = await this.getUserDataFromDb();
    let arrayDb = dataFromDb.map(x =>{return {"id": x.id,"username":x.username}} )
    
    let readFile = await usersDal.readFile()
    let permissions = await permissionsDal.readFile()

    const result = arrayDb.map(item => {
        const obj = readFile.find(o => o.id === item.id);
        return { ...item, ...obj };
      });

      const result2 = result.map(item => {
        const obj = permissions.find(o => o.id === item.id);
        return { ...item, ...obj };
      });

    
    return result2;
    
    
}

exports.getUserDataFromDb = async function()
{
    let result = await User.find({});
    return result;
}
//functions for add new user to all sources
exports.addUser = async function(obj)
{
    
    let readFile = await usersDal.readFile()
    
    let permissions = await permissionsDal.readFile()
    let result = await this.addUserOnlyToDb(obj.username);

    if(result == "worked"){
        //get the new user id for create the user in the jason files
        let username = await User.findOne({username: obj.username});
        
        
        
        let newPermission = {
            "id":username.id,
            "permission":obj.permission
        }

        permissions.push(newPermission)
        
        let moshe = writeToPermission.writeFile(permissions)
        
        let newUser = {
                "id":username.id,
                "FirstName":obj.firstname,
                "LastName":obj.lastname,
                "CreateDate":new Date(),
                "SessionTimeOut":obj.SessionTimeOut
        }
        
        readFile.push(newUser)
        let result2 = writeToFile.writeFile(readFile)
        
    }
    
}
exports.addUserOnlyToDb = async function(username)
{
    return new Promise((resolve,reject)=>{
        const p = new User({
            username : username  
        });
        p.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("worked")
            }
        })
    })
        
}

exports.UpdateUserOnlyToDb = function(username,id)
{
    return new Promise((resolve,reject)=>{
        User.findByIdAndUpdate(id,
            {
                username : username
            }, function(err)
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

exports.getUser = async function(username)
{
    let results = await User.findOne({username: username});
    let readFile = await usersDal.readFile()
    let permissions = await permissionsDal.readFile()
    
    let data = readFile.filter(x => x.id == results.id )
    data = {...data[0], 'username': results.username}
    let per = permissions.filter(x =>x.id == results.id)
    data = {...data,"permissions":per[0].permission}
    return data
    
}

exports.updateUser = async function(obj,id)
{
    
    let users = await usersDal.readFile()
    
    let permissions = await permissionsDal.readFile()
    //let result = await this.addUserOnlyToDb(obj.username);

    
        //get the new user id for create the user in the jasons files

        let username =await this.UpdateUserOnlyToDb(obj.username,id)

     let newUsers = users.map(x =>{
        if(x.id == id){
            x.FirstName = obj.firstname,
            x.LastName = obj.lastname,
            x.SessionTimeOut = obj.SessionTimeOut
        }
        return x;
    })
    
    //console.log(newUsers);
    let result2 = writeToFile.writeFile(newUsers)
    
    let newPermissions = permissions.map(x =>{
        if(x.id == id){
            x.permission = obj.permission
        }
        return x;
    })
    let moshe = writeToPermission.writeFile(newPermissions)
        
}
exports.deleteHelpFunc = function(id)
{
    return new Promise((resolve, reject) =>
    {
        User.findByIdAndDelete(id, function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve("deleted!")
            }
        })
    })
}

exports.deleteUser = async function(id)
{
    let deleted = await this.deleteHelpFunc(id)

    let users = await usersDal.readFile()
    
     let newUsers = users.filter(x =>{
        if(x.id != id){
            return x;
        }
        [];
    })
        
     result = writeToFile.writeFile(newUsers)

     let permissions = await permissionsDal.readFile()
    
     let newPermissions = permissions.filter(x =>{
        if(x.id != id){
            return x;
        }
        [];
    })
        
     result = writeToPermission.writeFile(newPermissions)


    return "deleted!"
     
}