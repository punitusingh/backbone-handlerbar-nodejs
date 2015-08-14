var express = require('express');
var app = express();
var recommendation = require('./server/Recommendation');
var product = require('./server/Product');


app.use('/static', express.static('client'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


app.get('/recommendations', function (req, res) {
    recommendation.getRecommendation(function(json){
            res.json(json);
    });
});

app.get('/product/:id', function (req, res) {
    product.getProduct(req.params.id,function(json){
            res.json(json);
    });
});



app.get('/similarProducts/:categoryId/:productId', function (req, res) {
    recommendation.getSimilarRecommendation({categoryId:req.params.categoryId, productId: req.params.productId},function(json){
            res.json(json);
    });
});