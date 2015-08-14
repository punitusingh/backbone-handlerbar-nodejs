$(function(){

    var thumbnailTemplate = Handlebars.compile($("#thumbnail-template-1").html());
    var ThumbnailView = Backbone.View.extend({
        template:thumbnailTemplate,
        render:function(){
            return this.template(this.model.toJSON());
        }
    });

    var ThumbnailModel = Backbone.Model.extend({
        url:function(){
            return "/product/"+this.id;
        },
        parse: function ( response ) {
            var thumbnailData = response.ProductThumbnailData.productThumbnail ;
            if(thumbnailData){
                return {
                    id: thumbnailData.id,
                    imageSource: thumbnailData.imageSource,
                    fetched:true
                };
            }else{
                return undefined;
            }

        }
    });


    $.get("/recommendations",function(json){
        var bufferDiv=$("<div class='thumbnails'>");

        json.recommendedItems.forEach(function(element,index,array){
            var model = new ThumbnailModel({
                id:element.productId
            });
            model.fetch().then(function(){

                if(model.get("fetched")){
                    console.log(model.get("imageSource"));
                    bufferDiv.append(new ThumbnailView({model:model}).render());
                }

            });
        });
        $("#recommendation-container").html(bufferDiv);
    });

});