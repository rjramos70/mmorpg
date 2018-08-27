/* Cria a classe */
function UsuariosDAO(connection){
	this._connection = connection();
}

/* Funções da classe */
UsuariosDAO.prototype.inserirUsuario = function(usuario){
	this._connection.open( function(err, mongoclient){					// abriu a conexão com o banco de dados.
		mongoclient.collection("usuarios", function(err, collection){	// abriu a respectiva collection, nesse caso 'usuarios', para manipular o documento.
			collection.insert(usuario);
			/* Fecha a conexão logo depois de ser usada */
			mongoclient.close();
		});
	});

}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
	
	this._connection.open( function(err, mongoclient){					// abriu a conexão com o banco de dados.
		mongoclient.collection("usuarios", function(err, collection){	// abriu a respectiva collection, nesse caso 'usuarios', para manipular o documento.
			collection.find(usuario).toArray(function(err, result){		// busca usuario no banco
				if(result[0] != undefined){
					/* cria as variaveis de sessão */
					req.session.autorizado = true;	// foi criado a variavel de sessão 'autorizado' e setado como TRUE;

					req.session.usuario = result[0].usuario;	// coloca o nome do usuario na variavel de sessão usuario.
					req.session.casa = result[0].casa;			// coloca o nome da casa na variavel de sessão casa.
				}

				if(req.session.autorizado){
					res.redirect('jogo');
				}else{
					// console.log(usuario.usuario);

					/* 
						como o usuário não autenticado o campo 'usuario' 
						vai vir vazio na requisição, assim validaremos o 
						erro e passaremos a mensagem para ser mostrada na 
						tela de login 
					*/
					req.assert('msg', 'Login ou senha inválido').notEmpty();


					/* recuperando erros caso haja */
					var erros = req.validationErrors();

					if (erros.length > 0) {
						res.render('index', { validacao: erros, dadosForm: {} });
					}

					// res.render('index', {validacao: {}, dadosForm: {}});
				}
			});
			// Fecha a conexão logo depois de ser usada
			mongoclient.close();
		});
	});

}


/* Exporta a classe para ser utilizada no Consig do arquivo 'config/server.js' */
module.exports = function(){
	return UsuariosDAO;
}