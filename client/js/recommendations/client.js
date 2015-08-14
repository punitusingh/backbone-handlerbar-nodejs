$(function(){

    var thumbnailTemplate = Handlebars.compile($("#thumbnail-template").html());
    var ThumbnailView = Backbone.View.extend({
        template:thumbnailTemplate,
        render:function(){
            return this.template(this.model.toJSON());
        }
    });

    $.get("/recommendations",function(json){
        var bufferDiv=$("<div class='thumbnails'>");

        json.recommendedItems.forEach(function(element,index,array){
            var model = new Backbone.Model({
                id:element.productId
            });
            bufferDiv.append(new ThumbnailView({model:model}).render());
        });
        $("#recommendation-container").html(bufferDiv);
    });

});