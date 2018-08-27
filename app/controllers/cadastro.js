module.exports.cadastro = function(application, req, res){
	res.render('cadastro', { validacao: {}, dadosForm: {} });
}

module.exports.cadastrar = function(application, req, res){
	
	/* Recebe os dados do form cadastro.ejs */
	var dadosForm = req.body;

	/* Valida os dados */
	req.assert('nome', 'Nome não pode ser vazio').notEmpty();
	req.assert('usuario', 'Usuário não pode ser vazio').notEmpty();
	req.assert('senha', 'Senha não pode ser vazio').notEmpty();
	req.assert('casa', 'Casa não pode ser vazio').notEmpty();


	/* havendo algum erro nós podemos recupera-la */
	var erros = req.validationErrors();
	
	if (erros.length > 0) {
		res.render('cadastro', { validacao: erros, dadosForm: dadosForm });	// havendo erro, renderizar a view cadastro.ejs passando a lista de erros no parametro 'validacao';
		return;	// força parar o processamento (boa prática sempre fazer isso).
	}

	/* Recupera a conexão com o banco */
	var connection = application.config.dbConnection;
	var UsuariosDAO = new application.app.models.UsuariosDAO(connection);

	UsuariosDAO.inserirUsuario(dadosForm);

	/* Geração dos parâmetros */
	var JogoDAO = new application.app.models.JogoDAO(connection);
	JogoDAO.gerarParametros(dadosForm.usuario);


	/* Não havendo erro podemos seguir o fluxo */
	res.send('Podemos cadastrar');

}