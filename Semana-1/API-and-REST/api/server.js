const app = require("./config/express-config");

const data = require("./data.json");

app.get("/clients", function( req, res ) {

	res.json( data );
});

app.get("/clients/:id", function( req, res ) {

	const { id } = req.params;

	const client = data.find( cli => cli.id == id );

	if ( !client ) {
		return res.status(204).json();
	}

	res.json( client );
});

app.post("/clients", function( req, res ) {

	const { name, email } = req.body;

	const newClient = {
		id: data.length + 1,
		name: name,
		email: email
	};

	data.push( newClient );

	res.json( newClient );
});

app.put("/clients/:id", function( req, res ) {

	const { id } = req.params;

	const client = data.find( cli => cli.id == id );

	if ( !client ) {
		return res.status(204).json();
	}

	const { name, email } = req.body;

	client.name = name;
	client.email = email;

	res.json( client );
});

app.delete("/clients/:id", function( req, res ) {

	const { id } = req.params;

	const clientsFiltered = data.filter( client => client.id != id );

	res.json( clientsFiltered );
});


app.listen(3030, function() {
	console.log("Servidor rodando!");
});

