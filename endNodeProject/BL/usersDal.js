const axios = require("axios")
const Member = require('../models/MemberModel')

exports.getUsers = async function()
{
    let resp =  await axios.get("https://jsonplaceholder.typicode.com/users")
    let data = resp.data
    let data2 = data.map(y =>{
        return {name: y.name, email: y.email, city: y.address.city}
    });
    
    return new Promise((resolve,reject) =>
    {
        data2.forEach(item =>{
            const p = new Member({
                Name : item.name,
                Email : item.email,
                City : item.city
            });
            console.log(p)
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



