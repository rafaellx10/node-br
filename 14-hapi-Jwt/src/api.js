const hapi = require("hapi");
const MongoDb = require("./db/strategies/mongodb/mongodb");
const Context = require("./db/strategies/base/contextStrategy");
const HeroisSchema = require("./db/strategies/mongodb/schemas/heroisSchemas");
const HeroRoutes = require("./routes/heroRoutes");
const AuthRoutes = require("./routes/authRoutes");
const hapiSwagger = require("hapi-swagger");
const vision = require("vision");
const inert = require("inert");
const JWT_SECRET = "MEU_SEGREDAO_123";
const hapiJwt = require("hapi-auth-jwt2");

const app = new hapi.Server({
	port: 5000,
});

function mapRoutes(instace, methods) {
	// ['list','create', 'update']
	// new HeroRoutes()['list']()
	// new HeroRoutes().list()

	return methods.map((method) => instace[method]());
}

async function main() {
	const connection = MongoDb.connect();
	const context = new Context(new MongoDb(connection, HeroisSchema));
	const swaggerOptions = {
		info: {
			title: "API Herois - #CursoNodeBR",
			version: "v1.0",
		},
	};
	// console.log(
	// 	"mapRoutes ======>",
	// 	mapRoutes(new HeroRoutes(context), HeroRoutes.method())
	// );
	await app.register([
		hapiJwt,
		vision,
		inert,
		{
			plugin: hapiSwagger,
			options: swaggerOptions,
		},
	]);
	app.auth.strategy("jwt", "jwt", {
		key: JWT_SECRET,
		// options: {
		// 	expiresIn: 20
		// },
		validate: (dado, request) => {
			// verifica no banco se usuario continua ativo
			// verifica no banco se usuario continua pangando

			return {
				isValid: true,
			};
		},
	});
	app.auth.default("jwt");
	app.route([
		...mapRoutes(new HeroRoutes(context), HeroRoutes.methods()),
		...mapRoutes(new AuthRoutes(JWT_SECRET), AuthRoutes.methods()),
	]);
	await app.start();
	console.log("Servidor rodando na porta ", app.info.port);

	return app;
}

module.exports = main();
