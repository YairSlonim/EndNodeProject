const jsonfile = require("jsonfile");

exports.writeFile = function(data)
{
        jsonfile.writeFile("dals/permissions.json",data,function(err)
        {
            if(err)
            {
                console.log(err)
            }
            else
            {
                console.log("nice") 
            }
        })
    
    return "nice"
}