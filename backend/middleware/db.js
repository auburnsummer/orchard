const knex = require("knex")({
	client: "pg",
	connection: {
		host : "127.0.0.1",
		user : "postgres",
		password : "hello",
		database : "postgres"
	}
});

module.exports = (req, res, next) => {
	req.knex = knex;
	next();
};
