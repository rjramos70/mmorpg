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

	/* recupera parâmetro passado via URL da função 'ordenar_acao_sudito' */
	var msg = '';
	if (req.query.msg != '') {
		msg = req.query.msg;
	}

	
	/* Recuperar os dados do 'jogo' de nosso banco de dados */
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);
	
	var usuario = req.session.usuario;
	var casa = req.session.casa;

	JogoDAO.iniciaJogo(res, usuario, casa, msg);


}

module.exports.sair = function(application, req, res){
	
	var usuario = req.session.usuario;

	req.session.destroy(function(err){
		console.log('Sessão do usuário "' + usuario + '" foi destruída.');
		res.render('index', { validacao: {}, dadosForm: {} } );	// direciona para a pagina de login.
	});

}

module.exports.suditos = function(application, req, res){
	
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
	
	res.render('aldeoes', { validacao: {}, dadosForm: {} });	

}

module.exports.pergaminhos = function(application, req, res){
	
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

	/* recuperar as ações inseridas no banco de dados */
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	/* recupera o usuário logado setado na session */
	var usuario = req.session.usuario;


	JogoDAO.getAcoes(usuario, res);

}

module.exports.ordenar_acao_sudito = function(application, req, res){
	
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

	/* recebe os dados do formulário dos aldeões/súditos */
	var dadosForm = req.body;

	/* Faz as respectivas validações */
	req.assert('acao', 'Ação deve ser informada.').notEmpty();
	req.assert('quantidade', 'Ação deve ser informada.').notEmpty();

	/* Recupera em caso de erros */
	var erros = req.validationErrors();

	if (erros) {
		res.redirect('jogo?msg=A');
		return;
	}

	// Tratativas para inserção no banco de dados
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	// Insere no objeto JSon a chave do usuário logado e que criou a ação
	dadosForm.usuario = req.session.usuario;

	JogoDAO.acao(dadosForm);

	// Após gravado com sucesso, redirecionar para a view 'jogo' 
	res.redirect('jogo?msg=B');

}

module.exports.revogar_acao = function(application, req, res){

	// recupera o parametro passado na URL
	var url_query = req.query;

	// Tratativas para inserção no banco de dados
	var connection = application.config.dbConnection;
	var JogoDAO = new application.app.models.JogoDAO(connection);

	// recupera o parametro _id
	var _id = url_query.id_acao;

	JogoDAO.revogar_acao(_id, res);


}

