
console.log("Recommendaion server");

var http=require("http");
var querystring=require('querystring');




var options = {
    hostname: 'www1.qa15codemacys.fds.com',
    port: 80,
    path: '/sdp/rto/request/recommendations',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

function getRecommendation(postData, callback){
    options.headers['Content-Length'] = postData.length;
    var request=http.request(options,function(response){

        var body = '';

        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            var json=JSON.parse(body);
            callback(json);
        });
    });

    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        callback(false);
    });

    request.write(postData);
}

module.exports={
    getRecommendation:function(callback){
        var postData =  querystring.stringify({
            requester: 'MCOM-NAVAPP',
            context: 'DRP',
            productId: '-9',
            maxRecommendations: 100,
            categoryId:118,
            visitorId:'471ae960471a1140471a3cb0471a0ba0471abc70471afb80471a9e40471ade60'
        });
        getRecommendation(postData,callback)
    },
    getSimilarRecommendation:function(productModel,callback){
        var postData =  querystring.stringify({
            requester: 'MCOM-NAVAPP',
            context: 'DRP_ZONE_A',
            productId: productModel.productId,
            maxRecommendations: 15,
            categoryId:productModel.categoryId,
            visitorId:'471ae960471a1140471a3cb0471a0ba0471abc70471afb80471a9e40471ade60'
        });
        getRecommendation(postData,callback)
    }
};

//getRecommendation(function(json){console.log(json)});
//getSimilarRecommendation({productId:2185591, categoryId:13247},function(json){console.log(json)})