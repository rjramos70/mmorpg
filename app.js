/* importar as configurações do servidor */
var app = require('./config/server');

var port = 8001;

/* parametrizar a porta de escuta */
app.listen(port, function(){
	console.log('Servidor online on port ' + port);
})


