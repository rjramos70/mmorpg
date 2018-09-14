// importamos esse módulo para fazer o parser de String para ObjectId e podermos
// comparar o _id de cada documento dentro da collection
var ObjectiID = require('mongodb').ObjectId;


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

JogoDAO.prototype.iniciaJogo = function(res, usuario, casa, msg){
	this._connection.open( function(err, mongoclient){			// abriu a conexão com o banco de dados.
		mongoclient.collection("jogo", function(err, collection){	// abriu a respectiva collection, nesse caso 'jogo', para manipular o documento.
			
			collection.find({usuario: usuario}).toArray(function(err, result){		// busca usuario no banco

				res.render('jogo', { img_casa: casa, jogo: result[0], msg: msg } );	// direciona para a view 'jogo'

			});
			// Fecha a conexão logo depois de ser usada
			mongoclient.close();
		});
	});
}


JogoDAO.prototype.acao = function(acao){
	
	
	this._connection.open( function(err, mongoclient){				// abriu a conexão com o banco de dados.
		// Insere a ação
		mongoclient.collection("acao", function(err, collection){	// abriu a respectiva collection, nesse caso 'acao', para manipular o documento.
			// Insere no objeto JSon o momento em que a acao termina 
			var date = new Date();
			var tempo = null;

			// Seta a quantidade de horas com base na ação escolhida no forma
			switch(parseInt(acao.acao)){
				case 1: 
					tempo = (1 * 60 * 60000);	// 1h * 60 minutos * 60000 milesegundos;
					break;
				case 2: 
					tempo = (2 * 60 * 60000);	// 2h * 60 minutos * 60000 milesegundos;
					break;
				case 3: 
					tempo = (5 * 60 * 60000);	// 5h * 60 minutos * 60000 milesegundos;
					break;
				case 4: 
					tempo = (5 * 60 * 60000);	// 5h * 60 minutos * 60000 milesegundos;
					break;
			}

			// date.getTime(); ==> função retorma em milesegundos um instante atual entre a data de '01/01/1970' até o instante em que a função getTime() foi executada.
			acao.acao_termina_em = date.getTime() + tempo;

			collection.insert(acao);	

		});

		// Atualiza as moedas
		mongoclient.collection("jogo", function(err, collection){

			var moedas = null;

			switch(parseInt(acao.acao)){
				case 1: 
					moedas = -2 * acao.quantidade;	// opção 1 * quantidade
					break;
				case 2: 
					moedas = -3 * acao.quantidade;	// opção 2 * quantidade
					break;
				case 3: 
					moedas = -1 * acao.quantidade;	// opção 3 * quantidade
					break;
				case 4: 
					moedas = -1 * acao.quantidade;	// opção 4 * quantidade
					break;
			}

			// atualiza a quantidade de moedas com base no usuario logado.
			collection.update(
					{ usuario: acao.usuario },		// critério de pesquisa
					{ $inc: { moeda: moedas } }	// instrução de atualização, ou seja, as chaves dentro do documento. $inc incrementa um valor
					// {  } : o terceiro parametro é o 'multi' (para multiplos registros) que pode default é FALSE
				);

			// Fecha a conexão logo depois de ser usada
			mongoclient.close();

		});
	});
	
}

JogoDAO.prototype.getAcoes = function(usuario, res){
	// console.log('Recuperando ações..');
	this._connection.open( function(err, mongoclient){			// abriu a conexão com o banco de dados.
		mongoclient.collection("acao", function(err, collection){	// abriu a respectiva collection, nesse caso 'jogo', para manipular o documento.	
			
			var date = new Date();
			var momento_atual = date.getTime();

			collection.find({usuario: usuario, acao_termina_em: {$gt: momento_atual}}).toArray(function(err, result){		// busca usuario no banco
				

				res.render('pergaminhos', { acoes: result, dadosForm: {} });	

			});
			// Fecha a conexão logo depois de ser usada
			mongoclient.close();
		});
	});
}


JogoDAO.prototype.revogar_acao = function(_id, res){
	// console.log('Recuperando ações..');
	this._connection.open( function(err, mongoclient){			// abriu a conexão com o banco de dados.
		mongoclient.collection("acao", function(err, collection){	// abriu a respectiva collection, nesse caso 'jogo', para manipular o documento.	
			
			collection.remove(
				{ _id: ObjectiID(_id) },	// um JSon com o critério para a remoção do documento dentro da collection
				function(err, result){	// função de callback que vai ser executada logo após a remoção
					res.redirect("jogo?msg=D");

					// Fecha a conexão logo depois de ser usada
					mongoclient.close();
				}
			);

			
		});
	});
}




/* Exportando a classe para ser utilizada no Consig do arquivo 'config/server.js' */
module.exports = function(){
	return JogoDAO;
}



