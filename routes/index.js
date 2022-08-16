var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Collaborative Code Editor - write some come with family!' });
});

/* GET about page. */
router.get('/about', function(req, res, next){
  res.render('about', {title: 'Collaborative Code Editor - write some come with family!'})
})

module.exports = router;
