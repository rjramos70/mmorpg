module.exports.jogo = function(application, req, res){
	
	// SE sessão autenticada
	if (req.session.autorizado != true) {

		/* 
			como o usuário não autenticado o campo 'usuario' 
			vai vir vazio na requisição, assim validaremos o 
			erro e passaremos a mensagem para ser mostrada na 
			tela de login 
		*/
		req.assert('usuario', 'Favor fazer o login.').notEmpty();


		/* recuperando erros caso haja */
		var erros = req.validationErrors();

		if (erros.length > 0) {
			res.render('index', { validacao: erros, dadosForm: {} });
			return;
		}
	}

	
	/* Recuperar os dados do 'jogo' de nosso banco de dados */
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);
	
	var usuario = req.session.usuario;
	var casa = req.session.casa;

	JogoDAO.iniciaJogo(res, usuario, casa);


}

module.exports.sair = function(application, req, res){
	
	var usuario = req.session.usuario;

	req.session.destroy(function(err){
		console.log('Sessão do usuário "' + usuario + '" foi destruída.');
		res.render('index', { validacao: {}, dadosForm: {} } );	// direciona para a pagina de login.
	});

}

module.exports.suditos = function(application, req, res){
	
	res.render('aldeoes', { validacao: {}, dadosForm: {} });	

}

module.exports.pergaminhos = function(application, req, res){
	
	res.render('pergaminhos', { validacao: {}, dadosForm: {} });	

}