const hapi = require("hapi");
const MongoDb = require("./db/strategies/mongodb/mongodb");
const Context = require("./db/strategies/base/contextStrategy");
const HeroisSchema = require("./db/strategies/mongodb/schemas/heroisSchemas");

const app = new hapi.Server({
	port: 5000,
});

async function main() {
	const connection = MongoDb.connect();
	const context = new Context(new MongoDb(connection, HeroisSchema));
	app.route([
		{
			path: "/herois",
			method: "GET",
			handler: (request, head) => {
				return context.read();
			},
		},
	]);
	await app.start();
	console.log("Servidor rodando na porta ", app.info.port);
}

main();
