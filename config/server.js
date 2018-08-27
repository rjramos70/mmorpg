/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* importar o módulo do express-validator */
var expressValidator = require('express-validator');

/* importar o módulo do express-ssesion */
var expressSession = require('express-session');

/* iniciar o objeto do express */
var app = express();

/* setar as variáveis 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* configurar o middleware express-validator */
app.use(expressValidator());

/* configurar o middleware express-session */
app.use(expressSession({
	secret: 'hfsdihsfdsiufsub',	// string da chave que servirá para gerar o segredo do cookie de sessão.
	resave: false,  			// se TRUE, faz com que a sessão seja regravada no servidor, mesmo não havendo nenhuma modificação no Request, a cada requisição do usuário essa sessão vai ser gravada no lado do servidor, já FALSE grava uma só vez.  
	saveUninitialized: false 	// se TRUE, ela vai criar uma sessão nova sempre que a mesma for modificada, se FALSE, cria apenas uma sessão. 
}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('app/routes')
	.then('config/dbConnection.js')	// foi passado o nome do arquivo com a extensão para que nosso server não que seja um diretório.
	.then('app/models')
	.then('app/controllers')
	.into(app);

/* exportar o objeto app */
module.exports = app;