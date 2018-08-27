# Projeto Name

MMORPG Game of Throne

# Project Title

MMORPG web base project based in the Game of Throne

## Getting Started

Get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This project was developed in a system versiom macOS 10.13.6 with kernel Darwin 17.7.0, and we need the following installed software:

Node v8.9.4 or later
Npm v5.6.0 or later
MongoDB shell v4.0.1 or later

### Installing

First download the project, and install the MongoDB in a local machine, should edit on which port the application should run, so edit the file 'app.js', in this version it is running on port 8001.

```
var port = 8001;
```

After that configure the DB connection on the dbConnection.js , located in 'projetc folder/config/dbConnection.js', specify the connection string and the connection port of the MongoDB database. 

```
var connMongoDB = function(){
	var db = new mongo.Db(
			'got',		// database name.
			new mongo.Server(
				'localhost',	// database address.
				27017,			// port that the database is running.
				{}				// object with server configuration option.
			),
			{}	// additional configuration object for our DB object.	
		);

	return db;
}
```

configuring the connection, open a terminal and navigate to the project root folder and start the application:

```
nodemon app
```

Check if there was any error message, otherwise a list of routes, configuration file, models and controls will appear:

```
+ ./app/routes/adm.js
+ ./app/routes/cadastro.js
+ ./app/routes/index.js
+ ./app/routes/jogo.js
+ ./config/dbConnection.js
+ ./app/models/JogoDAO.js
+ ./app/models/UsuariosDAO.js
+ ./app/controllers/adm.js
+ ./app/controllers/cadastro.js
+ ./app/controllers/index.js
+ ./app/controllers/jogo.js
Servidor online on port 8001
```

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds


* [BootStrap](https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/) - Used to generate the views
* [Body-Parser] - Used to make data parse of the forms
* [Consign] - Used to automatically load the application
* [EJS] - Used to render the views
* [Express] - Used to creating the project
* [Express-Session] - Used to handle application sessions
* [Express-Validator] - Used to validate form data
* [MongoDB] - Used for storing the data


## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* ** Renato Ramos ** - * based on the training given by Professor Jorge Sant Ana at UDEMY * - [MMORP](https://github.com/rjramos70/mmorpg)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* NodeJS
* JavaScript
* CSS
* HTML
* Express
* NPM
* Amoung other
