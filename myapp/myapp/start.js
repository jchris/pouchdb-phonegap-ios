$('body').html(ddoc.body);

var content = $("#content");

var showdownConverter = new Showdown.converter(),
    wikiLinkPrefix = "#/wiki/";
function wikiToHtml(string) {
    return showdownConverter.makeHtml(string.replace(/\[\[(.*)\]\]/g,"[$1]("+wikiLinkPrefix+"$1)"))
};

content.bindPath("/config", function() {
    console.log("get config")
    $('#content').html(ddoc.settings);
})


content.bindPath("/wiki/:name", function(e, params) {
    var id = 'wiki:' + params.name;
    getDoc(id, function(err, doc) {
        console.log("get", err, doc)
        if (err) {
            doc = {title : 'Want to create page "'+params.name+'"?', 
                markdown : "Article content goes here. Click [edit](#/edit/"+params.name+") to create a page called \""+params.name+"\"."};
        }
        console.log("get page", doc)
        doc.body = wikiToHtml(doc.markdown);
        $('#content').html($.mustache(ddoc.read, doc));
    });
    $("#breadcrumbs").text("> "+params.name)
    $("#pagenav .edit").attr({href : "#/edit/"+params.name}).show();
});

content.bindPath("/edit/:name", function(e, params) {
    var id = 'wiki:' + params.name;
    getDoc(id, function(err, doc) {
        if (err) {
            doc = {_id : id, title : params.name, 
                markdown : "Article content goes here. Link to articles like this: [[Home]]"};
        }
        $('#content').html($.mustache(ddoc.edit, doc));
        $("#content form").submit(function() {
            doc.title = $('input[name="title"]', this).val();
            doc.markdown = $('textarea', this).val();
            console.log(doc);
            pouchdb.put(doc, function(err, ok) {
                console.log("put",err,ok)
                $.pathbinder.go("#/wiki/"+params.name);
            });
            return false;
        });
    });
    $("#pagenav .edit").hide();
});

$.pathbinder.begin("/wiki/Home");

pouchdb.changes({continuous:true, onChange: function(change) {
    console.log("change", change)
}}, function(change) {
    console.log("xchange", change)
})