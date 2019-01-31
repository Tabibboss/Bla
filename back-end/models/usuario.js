var Sequelize = require('sequelize');

module.exports = function(app, myDatabase) {

	// Create a model (each table in the database is represented by a model)
	// Here we create the 'User' model, which will represent the 'user' table in the bd
	var Usuario = myDatabase.define('usuario', {
	  nombreUsuario: Sequelize.STRING,
	  edad: Sequelize.INTEGER
	});
	// To see all the types of data that can be used in a model, see the reference: http://docs.sequelizejs.com/en/latest/docs/models-definition/#data-types
	
	// Synchronize DB: this function checks if this model needs a table in the DB.
	myDatabase.sync();

	// REST API ROUTES FOR THIS MODEL
	app.get('/api/usuarios', function(req, res) {
		var Nower = new Date().toLocaleString();
		console.log('==== GET /api/usuarios ==== Start '+ Nower);

		Usuario.findAll().then(function(usuarios) {
			return res.status(200).json(usuarios);
		});

		var Nower = new Date().toLocaleString();
		console.log('==== GET /api/usuarios ==== End '+ Nower);
	});

	app.get('/api/usuarios/:id', function(req, res) {
		var id = req.params.id;

		var Nower = new Date().toLocaleString();
		console.log('==== GET /api/usuarios/' + id + ' ==== Start '+Nower);

		Usuario.findById(id).then(function(usuario) {
			return res.status(200).json(usuario);
		});

		var Nower = new Date().toLocaleString();
		console.log('==== GET /api/usuarios/' + id + ' ==== End '+Nower);
	});

	app.post('/api/usuarios', function(req, res) {

		var Nower = new Date().toLocaleString();
		console.log('==== POST /api/usuarios ==== '+ Nower);
		console.log(req.body);


		myDatabase.sync()
			.then(function() {
				Usuario.create(req.body); 
			})
			.then(function(usuarioCreado) {
				res.status(200).json(usuarioCreado);
			});



		
		var Nower = new Date().toLocaleString();
		console.log('==== POST /api/usuarios END ===='+ Nower);
	});

	app.delete('/api/usuarios/:id', function(req, res) {
		var Nower = new Date().toLocaleString();
		console.log('==== DELETE /api/usuarios ==== Start '+ Nower);
		var id = req.params.id;
		Usuario.destroy({
			where: {
				id: id
			}
		}).then(function(count) {
			console.log(count);
			if(count > 0) {
				return res.status(200).json({"message": "usuario borrado correctamente"});
			} else {
				return res.status(404).json({"error": "Id not found!"});
			}
		});


		var Nower = new Date().toLocaleString();
		console.log('==== DELETE /api/usuarios ==== End '+ Nower);
	});

};