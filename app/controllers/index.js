module.exports.index = function(application, req, res){

		res.render('index', { validacao: {}, dadosForm: {} } );
}

module.exports.autenticar = function(application, req, res){
	
	/* recuperando os dados do form */
	var dadosForm = req.body;

	/* Validando os dados */
	req.assert('usuario', 'Usuário não pode ser vazio.').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio.').notEmpty();

	/* recuperando erros caso haja */
	var erros = req.validationErrors();

	if (erros.length > 0) {
		res.render('index', { validacao: erros, dadosForm: dadosForm });
	}

	/* validação com base nas informações do nosso banco de dados */
	var connection = application.config.dbConnection;	// cria uma conexão com o banco.
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);	// cria uma instância da classe UsuariosDAO passando a conexão.
	UsuariosDAO.autenticar(dadosForm, req, res);


	// res.send('tudo OK para criar sessão.');
}