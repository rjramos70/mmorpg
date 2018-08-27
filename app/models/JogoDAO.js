/* Cria a classe */
function JogoDAO(connection){
	this._connection = connection();
}

/* Wrapper dos métodos */
JogoDAO.prototype.gerarParametros = function(usuario){
	this._connection.open( function(err, mongoclient){					// abriu a conexão com o banco de dados.
		mongoclient.collection("jogo", function(err, collection){	// abriu a respectiva collection, nesse caso 'usuarios', para manipular o documento.
			collection.insert({
				usuario: usuario,
				moeda: Math.floor(Math.random() * 50),	// Gera um número randomico entre 0 e 50.
				suditos: Math.floor(Math.random() * 100),	// Gera um número randomico entre 0 e 100.
				temor: Math.floor(Math.random() * 1000),	// Gera um número randomico entre 0 e 1000.
				sabedoria: Math.floor(Math.random() * 1000),	// Gera um número randomico entre 0 e 1000.
				comercio: Math.floor(Math.random() * 1000),	// Gera um número randomico entre 0 e 1000.
				magia: Math.floor(Math.random() * 1000)	// Gera um número randomico entre 0 e 1000.
			});
			/* Fecha a conexão logo depois de ser usada */
			mongoclient.close();
		});
	});
}

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa){
	this._connection.open( function(err, mongoclient){			// abriu a conexão com o banco de dados.
		mongoclient.collection("jogo", function(err, collection){	// abriu a respectiva collection, nesse caso 'jogo', para manipular o documento.
			console.log(usuario);
			collection.find({usuario: usuario}).toArray(function(err, result){		// busca usuario no banco
				console.log(result[0]);
				res.render('jogo', { img_casa: casa, jogo: result[0] } );	// direciona para a view 'jogo'

			});
			// Fecha a conexão logo depois de ser usada
			mongoclient.close();
		});
	});
}

/* Exportando a classe para ser utilizada no Consig do arquivo 'config/server.js' */
module.exports = function(){
	return JogoDAO;
}



