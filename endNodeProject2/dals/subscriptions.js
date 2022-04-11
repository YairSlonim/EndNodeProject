let axios = require('axios')

exports.getAllMembers =async function()
{
   return axios.get("http://localhost:8000/api/members")
}

exports.getMember =async function(id)
{
   return axios.get(`http://localhost:8000/api/members/${id}`)
}

exports.getMemberByName =async (name) =>
{
   return await axios.post("http://localhost:8000/api/members/member/getMemberByName",{name:name})
}

exports.getAllSub = function()
{
   return axios.get("http://localhost:8000/api/subscriptions")
}

exports.addNewSubscription =async function(id)
{
   
   let resp = await axios.post(`http://localhost:8000/api/subscriptions/addSub/${id}`)
   return resp
}

exports.addMovieToSub = async function(id,date,MovieId)
{
   let resp = await axios.post(`http://localhost:8000/api/subscriptions/updateSub/${id}`,{date:date, MovieId:MovieId})

   return resp
}

exports.updateMember = async (id,obj) =>
{
   let resp = await axios.post(`http://localhost:8000/api/members/${id}`,{obj:obj})
   return resp;
}

exports.addMember = async (obj) =>
{
   
   let resp = await axios.post(`http://localhost:8000/api/members`,{obj:obj})
   return resp;
}

exports.getSubById =async function(id)
{
   return await  axios.get(`http://localhost:8000/api/subscriptions/${id}`)
}

exports.deleteMovieInSub = async function(subId,data)
{
   
   let resp = await axios.post(`http://localhost:8000/api/subscriptions/deleteMovieInSub/${subId}`,{movieArr: data})

   return resp
}

exports.deleteMember = async function(id)
{
   
   let resp = await axios.delete(`http://localhost:8000/api/members/${id}`)

   return resp
}
exports.deleteMemberInSub = async function(id)
{
   let resp = await axios.delete(`http://localhost:8000/api/subscriptions/${id}`)
}
