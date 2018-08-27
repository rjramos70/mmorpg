module.exports = function(application){
	application.get('/adm', function(req, res){
		application.app.controllers.adm.home(application, req, res);
	});


}