
var http=require("http");

var getProduct = function(productid, callback){
    var url = "http://www1.qa19codemacys.fds.com/api/navigation/products/thumbnail/"+ productid;
    console.log("requesting product:",url);
    var request=http.get(url,function(response){

        var body = '';

        response.on('data', function (chunk) {
            body += chunk;
        });

        response.on('end', function () {
            if(response.statusCode === 200){
                var json=JSON.parse(body);
                callback(json);
            }else{
                console.log("product request failed for url", url);
                callback(false);
            }

        });
    });

    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
        callback(false);
    });
};

module.exports={
    getProduct:getProduct
};

//getProduct(2185532,function(json){console.log(json)});