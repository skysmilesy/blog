var express = require('express');
var router = express.Router();
router.get('/add', function (req, res) {
    res.render('article/add', { title: '发表文章' });
});

router.post('/add', function (req, res) {
    var article=req.body;
   // article.createAt=new Date().getTime();
    new Model('Article')(article).save(function(err,article){
        if(err){
            res.redirect('/articles/add');
        }else{
            res.redirect('/');
        }
    })

});
router.get('/list',function(req,res){
    Model('Article').find({}).exec(function(err,articles){
        console.log('articles------'+articles);
        res.render('index',{
            articles:articles
        })

    })

})
module.exports = router;