$(document).ready(function() {

    var MetaData = Backbone.Model.extend({

        urlRoot: '/get_metadata',

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
            var attributes = this.model.toJSON();
            console.log('rendering meta data view..', attributes);
            this.$el.html(this.template(attributes));
        }
    });

    var MetaFormView = Backbone.View.extend({

        el: $("div.meta-form-container"),

        render: function (data){
            console.log('rendering meta form view..');
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
