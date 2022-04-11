const express = require('express')

const router = express.Router();

const subscriptionsBL = require('../BL/subscriptionsBl')



router.route('/').get(async function(req,resp)
{
    let result = await subscriptionsBL.getSubscriptions()
    //console.log(result[0].Movies);
    return resp.json(result)
})

router.route('/:id').get(async function(req,resp)
{
    let result = await subscriptionsBL.getSubById(req.params.id)
    //console.log(result[0].Movies);
    return resp.json(result)
})

router.route('/:id')
.delete(function(req,resp)
{
    let id = req.params.id
    subscriptionsBL.deleteMember(id)
    return resp.json("deleted")
});


router.route('/addSub/:id').post(async function(req,resp)
{   
    
    let result = await subscriptionsBL.addSub(req.params.id)

    if(!result)
    {
        return "fail"
    }
    else{
        console.log("yes");
        return resp.json(result)
    }
    
})
router.route('/deleteMovieInSub/:subId').post(async function(req,resp)
{   
    let result = await subscriptionsBL.deleteMovieInSub(req.params.subId,req.body.movieArr)

    if(!result)
    {
        return "fail"
    }
    else{
        return resp.json(result)
    }
    
})

router.route('/updateSub/:id').post(async function(req,resp)
{   

    let result = await subscriptionsBL.updateMoviesInSub(req.params.id,req.body.date,req.body.MovieId)

    if(!result)
    {
        return "fail"
    }
    else{
        return resp.json(result)
    }
    
})




module.exports = router;