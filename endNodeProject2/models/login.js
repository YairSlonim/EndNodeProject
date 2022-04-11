const usersDal = require("../dals/readFromUsers");
const permissionsDal = require("../dals/readFromPermissions")
const User = require('../schema/usersSchema')

exports.checkValid = async function(userData)
{
    let result = await User.findOne({username: userData.username});
    let user 
    let UserPermissions
    if(result)
    {
    let users = await usersDal.readFile() 
     user = users.filter(x => {
        if(x.id == result._id)
        return x
    })
    let permissions = await permissionsDal.readFile()
        UserPermissions = permissions.filter(x =>{ 
        if(x.id == user[0].id) 
        return x
    })
    return [user,UserPermissions];
    }
    else{
        return ;
    }
     
    

}

exports.checkUserNameAndCreate = async function(userData)
{
    let users = await usersDal.readFile()
    let result = User.findOneAndUpdate({username: userData.username},{password: userData.password});
    return result;
}
