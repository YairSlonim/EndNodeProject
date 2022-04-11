const mongoose = require('mongoose')


let Schema = mongoose.Schema;

let MemberSchema = new Schema({

    Name: String,
    Email: String,
    City: String
     
});

module.exports = mongoose.model('members',MemberSchema)

/*
const dal = require('../dal/personsDAL')

exports.getAllPersons = function()
{
    return dal.getAll();
}

exports.getPerson = function(id)
{
    let person =  dal.getItemById(id);

    if(person.length>0){
        return person[0]
    }
}

exports.addPerson = function(obj)
{
    let newPerson = { id : obj.id , name : obj.name , age : obj.age };
    dal.addPersons(newPerson);
}

exports.updatePerson = function(id,obj)
{
    let updatedPerson = { id : obj.id , name : obj.name , age : obj.age };
    dal.updatePersons(id,updatedPerson);
}

exports.deletePerson = function(id)
{
    dal.updatePersons(id);
}
*/