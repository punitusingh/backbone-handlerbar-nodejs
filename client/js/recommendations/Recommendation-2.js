$(function(){

    var thumbnailTemplate = Handlebars.compile($("#thumbnail-template-1").html());
    var ThumbnailModel = Backbone.Model.extend({
        url:function(){
            return "/product/"+this.id;
        },
        parse: function ( response ) {
            if(response){
                var thumbnailData = response.ProductThumbnailData.productThumbnail ;
                if(thumbnailData){
                    return {
                        id: thumbnailData.id,
                        imageSource: thumbnailData.imageSource,
                        categoryId: thumbnailData.defaultCategoryId,
                        fetched:true
                    };
                }
            }

            return undefined;
        }
    });
    var ThumbnailCollection = Backbone.Collection.extend({
        model:ThumbnailModel
    });



    var ThumbnailView = Backbone.View.extend({
        template:thumbnailTemplate,
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    var ThumbnailCollectionView = ThumbnailView.extend({
        events:{
            'click' : 'next'
        },
        initialize:function(){
            this.nextIndex = -1;
        },
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
        next: function(){
            if(this.nextIndex === -1){
                $.get("/similarProducts/"+this.model.get("categoryId")+"/"+this.model.get("id"),function(json){
                    this.collection = new ThumbnailCollection(json.recommendedItems);
                    this.collection.add(this.model);
                    this.renderNext();
                }.bind(this));
            }else{
                this.renderNext();
            }
        },
        renderNext: function(){
            this.nextIndex++;
            if(this.nextIndex >= this.collection.length){
                this.nextIndex=0;
            }
            var model = this.collection.at(this.nextIndex);
            model.id = model.get('productId');
            model.fetch().then(function(){
                if(model.get("fetched")){
                    console.log(model.get("imageSource"));
                    var childView =  new ThumbnailView({el:this.$el, model:model});
                    childView.render();
                }else{
                    this.next();
                }
            }.bind(this));
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
                    bufferDiv.append(new ThumbnailCollectionView({model:model}).render().$el);
                }

            });
        });
        $("#recommendation-container").html(bufferDiv);
    });

});