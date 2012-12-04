window.app = {
	article : {}, user : {}
};

$(function() {
	$('body').html(ddoc["index"]);

	app.article.edit = function() {
		$('#content').html(ddoc["edit"]);
		console.log("draw the edit screen")
	};

	app.article.history = function() {
		console.log("show the history")
	};

	app.user.profile = function() {
		console.log("edit user profile")
	};
});
