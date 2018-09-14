/* importar o MongoDB */
var mongo = require('mongodb');

/* Foi feito um wrapper da conexão para evitar que a conexão seja criada assim que subirmos o servidor, mas que seja criada quando for demandada */
var connMongoDB = function(){
	
	// console.log('Entrou na função que retorna uma conexão com o banco!');

	/* Vamos fazer a conexão com o banco */
	var db = new mongo.Db(
			'got',		// nome do banco de dados
			new mongo.Server(	// objeto de conexão com o servidor, os parâmetros básicos para a conexão
				'localhost',	// string contendo o endereço do servidor do banco
				27017,			// porta de conexão
				{}				// objeto com opção de configuração do servidor
			),
			{}	// objeto de configuração adicionais para nosso objeto DB	
		);

	return db;
}

/* Como o objetivo é que nosso export seja utilizado no auto loader do consig, precisamos exportar essa variavel */
module.exports = function(){
	return connMongoDB;
}