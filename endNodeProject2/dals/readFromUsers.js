const jsonfile = require('jsonfile')

exports.readFile = function()
{
    return new Promise(resolve =>
    {
        jsonfile.readFile(__dirname +'/users.json', function(err,data)
        {
            let moshe = data
            resolve(moshe)
        })
    })
    
}