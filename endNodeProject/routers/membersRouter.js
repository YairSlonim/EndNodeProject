const express = require('express')

const router = express.Router();

const membersBL = require('../BL/MemberBl')

router.route('/')
    .get(async function(req,resp)
    {
       let moshe = await membersBL.getMembers()
       return resp.json(moshe)
    });
  
    router.route('/:id')
    .get( async function(req,resp)
    {
        let id = req.params.id;
        let moshe = await membersBL.getMember(id)
        return resp.json(moshe)
    });

    router.route('/member/getMemberByName')
    .post( async function(req,resp)
    {
        let name = req.body.name;
        let moshe = await membersBL.getMemberByName(name)
        return resp.json(moshe)
        
    });

    router.route('/')
    .post(function(req,resp)
    {
        membersBL.addMember(req.body.obj)
        return resp.json("created!")
    });

    router.route('/:id')
    .post(function(req,resp)
    {
        
        let id = req.params.id
        membersBL.updateMember(id,req.body.obj)
        return resp.json("updated!")
    });
  
    router.route('/:id')
    .delete(function(req,resp)
    {
        let id = req.params.id
        membersBL.deleteMember(id)
        return resp.json("deleted")
    });
    
    module.exports = router;
    