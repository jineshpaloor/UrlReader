$(document).ready(function() {

    var MetaData = Backbone.Model.extend({

        urlRoot: '/get_metadata/',

        defaults: {
            url: '',
            title: '',
            keywords: '',
            description: ''
        },

    });

    //define view to show metadata - render todoitem to html element
    var MetaDataView = Backbone.View.extend({

        el: $("div.meta-data-container"),

        events: {
            "click .edit-metadata": "editMetadata"
        },

        initialize: function (){
            this.listenTo(this.model, 'change', this.render);
            var input_url = this.model.get('url');
            this.model.fetch({data: {input_url: input_url}});
        },

        template: _.template('<h2 class="meta-header">' +
                      'Details for : <%= url %> </h2>' +
        '<div class="meta-details">' +
            '<p><strong>Title:</strong> <%= title %></p>' +
            '<p><strong>Meta Description:</strong> <%= description %></p>' +
            '<p><strong>Meta Keywords:</strong><%= keywords %></p>' +
        '</div>' +
        '<input type="button" class="edit-metadata btn btn-inverse" value="Edit">'),

        render: function (){
            this.$el.show();
            console.log('metadata view render called.....');
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
        },

        editMetadata: function (){
            this.$el.hide();
            var metaform = new MetaFormView({model:this.model});
            metaform.render();
        }

    });

    var MetaFormView = Backbone.View.extend({

        el: $("div.meta-form-container"),

        events: {
            "click #MetaFormSubmit": "formSubmit"
        },

        template: _.template('<h2 class="meta-header">' +
                      'Details for : <%= url %> </h2>' +
            '<form method="POST" id="MetaForm" class="form-horizontal" action="/update_metadata/">' +
              '<div class="control-group">' +
                  '<label class="control-label" for="inputEmail"><label for="id_url">Url</label> </label>' +
                '<div class="controls">' +
                    '<input id="id_url" maxlength="200" name="url" type="text" value="<%= url %>">' +
                '</div>' +
              '</div>' +
              '<div class="control-group">' +
                  '<label class="control-label" for="inputEmail"><label for="id_title">Title</label> </label>' +
                '<div class="controls">' +
                    '<input id="id_title" maxlength="100" name="title" type="text" value="<%= title %>">' +
                '</div>' +
              '</div>' +
              '<div class="control-group">' +
                  '<label class="control-label" for="inputEmail"><label for="id_description">Description</label> </label>' +
                '<div class="controls">' +
                    '<textarea cols="40" id="id_description" name="description" rows="10"><%= description %></textarea>' +
                '</div>' +
              '</div>' +
              '<div class="control-group">' +
                  '<label class="control-label" for="inputEmail"><label for="id_keywords">Keywords</label> </label>' +
                '<div class="controls">' +
                    '<textarea cols="40" id="id_keywords" name="keywords" rows="10"><%= keywords %></textarea>' +
                '</div>' +
              '</div>' +
            '<input type="button" class="btn btn-inverse" id="MetaFormSubmit" value="Submit">' +
            '</form>'),

        render: function (){
            console.log('metaform view render called.....');
            var attributes = this.model.toJSON();
            this.$el.html(this.template(attributes));
            this.$el.show();
        },

        formSubmit: function(){
             console.log("form submitted...");
             var title = this.$el.find('#id_title').val();
             var url = this.$el.find('#id_url').val();
             var description = this.$el.find('#id_description').val();
             var keywords = this.$el.find('#id_keywords').val();
             console.log("saving model...");
             this.model.save({title: title, url: url, description: description, keywords: keywords}, {success: function (){
                 console.log("model saved...", that.model);
                 //var metadataview = new MetaDataView({model: this.model});
             }});
             console.log("after model saved...");
        }
    });

    var SearchView = Backbone.View.extend({

        el: $("div.url-search"),

        events: {
            "click #SubmitUrl": "getSearchResult"
        },

        initialize: function (){
            this.input = this.$("#InputUrl");
        },

        getSearchResult: function (e){
            e.preventDefault();
            var input_url = this.input.val();
            var metadata = new MetaData({url: input_url});
            var metadataview = new MetaDataView({model: metadata});
        }

    });

    var AppView = Backbone.View.extend({

        initialize: function(){
            var search = new SearchView;
        },

    });

    var appview = new AppView({});

    //$("#SubmitUrl").click(function (){
        //$(".loader").show();
        //var input_url = $("#InputUrl").val();
        //var content = $("#content");
        //$.ajax({
            //url:"/get_metadata/",
            //type: 'GET',
            //data: {'input_url': input_url},
            //success: function (resp){
                //$(".loader").hide();
                //if (resp.success){
                    //$(content).html(resp.html);
                //}else{
                    //console.log('error in url..');
                //}
            //}
        //});
    //});
//
    //$("#MetaFormSubmit").live('click', function (e){
        //e.preventDefault();
        //$(".loader").show();
        //var form = $("#MetaForm");
        //var content = $("#content");
        //$.ajax({
            //url:"/update_metadata/",
            //type: 'POST',
            //data: $(form).serialize(),
            //dataType: 'json',
            //success: function (resp){
                //$(".loader").hide();
                //$(content).html(resp.html);
            //}
        //});
    //});
//
    //$(".edit-metadata").live('click', function (e){
        //$(this).hide();
        //$(".meta-details").hide();
        //$(".meta-form").show();
    //});
//
});
