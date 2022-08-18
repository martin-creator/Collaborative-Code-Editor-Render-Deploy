var express = require("express");
var router = express.Router();

/* GET for createTask */

router.get('/createTask', function(req, res){
    var newTask = new Task();

    newTask.save(function(err, data){
        if(err){
            console.log(err);
            return res.render('error');
        }else{
            res.redirect('/task/' + data._id);
        }
    })
});


/* GET for task/id */

router.get('/task/:id', function(req, res){
    if(req.params.id){
        Task.findOne({_id: req.params.id}, function(err, data){
            if(err){
                console.log(err);
               return  res.render('error');
            }

            if(data){
                return res.render('task', {data: data});
            }else {
                return res.render('error');
            }
            res.render('error');
        });
    }
})

module.exports = router;